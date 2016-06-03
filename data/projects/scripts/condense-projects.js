#!/usr/bin/env node
var Converter = require("csvtojson").Converter;
var _ = require("lodash");
var async = require("async");
var file = require("fs");
var moment = require("moment");

var main = main || {};

main.session = {};
main.config = {};
main.data = {};

main.config.debug = 0; //set to 1 for lost of debug info
main.config.csvFiles = [
    {
        "objectName": "assigments",
        "filepath": process.env.RW_GIT_BASE_DIR + "/data/projects/data-samples/assignments.csv"
    },
    {
        "objectName": "projects",
        "filepath": process.env.RW_GIT_BASE_DIR + "/data/projects/data-samples/rw-accs-projects.csv"
    }
];

main.config.jsonKeyTranslator = {
    "account": "clientName",
    "project_name": "salesForceProjectName",
    "start_date": "startDate",
    "end_date": "endDate",
    "project_manager": "_createProjManager",
    "record_id": "salesforceRecordId"

};

function handleError (error) {
    if (error) return console.error('Uh-oh, there was an error', error);
}

init(handleError, convertCsvToJson);

function init(handleError, callback){
    console.log("===========");
    console.log("condense-projects.js process started");
    if (main.config.debug){
        console.log("main.init called!");
        console.log(main.config.csvFiles);
    }


        /*
         * Example of cleaned up project record
         {
         account: 'St. Jude Children’s Research Hospital',
         project_name: 'St Jude: Sept-Dec13-Feb14',
         region: 'NATL',
         practice: 'Enterprise Web',
         project_manager: 'Mike Green',
         start_date: '12/1/2013',
         end_date: '2/28/2014',
         record_id: 'a1D70000001JGPI'
         },
         *
         * */



        /*
        * Example of finished project json consumed by RW application
        *
         {
         "clientName": "Johnson, Smith, and Jones Law Firm",
         "clientDescription": "Virtuosos of Legal Orchestration.",
         "clientWebsite": "www.johnsonsmithandjonesthelegalvirtuosos.com",
         "confidential": false,
*         "projectName": "ECM",
*         "region": "DFW",
*         "proactice": "Enterprise Web",
         "startDate": "2000-01-01",
         "expectedEndDate": "2001-01-01",
         "endDate": "2002-01-01",
*         "salesforceRecordId": "a1D70000001JGPI",
         "summary": "<p>Build an Electronic Case Manager for Johnson, Smith, and Jones Law Firm.</p>",
         "clientContacts": [
             {
             "type": "business",
             "firstName": "Hugo",
             "lastName": "Suya",
             "title": "Business director",
             "cell": "222-222-2222",
             "email": "hugosuya@johnsonsmithandjonesthelegalvirtuosos.com"
             }
         ],
         "projectSkills": [
             "Elasticsearch",
             "Python",
             "Flask",
             "jQuery"
         ],
         "positions": [
             {
             "title": "Project Manager",
             "responsibilities": "Manage people, communications, and planning.",
             "assignmentName": "",
             "filledBy": [
                 {
                 "userId": "33cd654a2",
                 "startDate": "2000-01-01",
                 "endDate": "2002-01-01"
                 }
             ]
             },
             {
             "title": "Senior Architect",
             "responsibilities": "Web application architecture",
             "assignmentName": "salesforce assignment name",
             "filledBy": [
                 {
                 "userId": "33cd654a2",
                 "startDate": "2000-01-01",
                 "endDate": "2002-01-01"
                 }
             ],
             "positionSkills": [
                 "Elasticsearch",
                 "Python",
                 "Flask"
             ]
             },
             {
             "title": "Web Developer",
             "responsibilities": "UI design and development",
             "filledBy": [
                 {
                 "userId": "a673b4f1",
                 "startDate": "2000-01-01",
                 "endDate": "2002-01-01"
                 }
             ],
             "positionSkills": [
                 "jQuery",
                 "Python",
                 "Flask"
             ]
             }
         ]
         }
        *
        *
        * */
     callback(null, cleanRawJson);
}


function convertCsvToJson(handleError, callback){
    //http://stackoverflow.com/questions/25431518/write-after-end-error-with-express-csvtojson-and-node-walk
    if (main.config.debug){
        console.log("convertCsvToJson");
    }

    var rawJson = {};
    _.forEach(main.config.csvFiles, function(csvFil){
        var converter = new Converter({});
            converter.fromFile(csvFil.filepath, function(err,results){
                if (err){
                    handleError(err);
                } else {
                    var dataObjName = csvFil.objectName;
                    main.data[dataObjName] = _.clone(results);
                    if (csvFil.objectName === 'projects'){
                        callback(null, cleanProjectNames, results);
                    } else if (csvFil.objectName === 'assignments'){
                        console.log("assignments csv processed!");
                    }
                }
            });
    });
}


/** Clean up json structure to make it easy to use **/
 function cleanRawJson(handleError, callback, rawJson){
    if (main.config.debug){
        console.log("cleanRawJson called!");
        console.log("rawJson:");
        console.log(rawJson);
    }

    var cleanJson = [];
        _.forEach(rawJson, function(row){
            var keys = _.keys(row);
            var newObj = {};
            _.forEach(keys, function(k){
                var nospaceKey = k.replace(" ", '_'); //get rid of spaces
                var normKey = nospaceKey.toLowerCase();
                var transValue;
                /* if the value is a date, put it into the correct format */
                var dateSlashRegexp = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/g;

                if (row[k].match(dateSlashRegexp)){
                    var myDate = moment(row[k], "M/D/yyyy");
                    transValue = myDate.format("YYYY-MM-DD");
                } else {
                    transValue = row[k];
                }


                /* if a key translator matches, change the name of the key */
                if (main.config.jsonKeyTranslator.hasOwnProperty(normKey)){
                    var transName = main.config.jsonKeyTranslator[normKey];
                    newObj[transName] = transValue;
                } else {
                    newObj[normKey] = transValue;
                }
            });
            cleanJson.push(newObj);
        });
    callback(null, addAssignments, cleanJson);
}


 function cleanProjectNames(handleError, callback, cleanJson){
     if (main.config.debug){
         console.log("cleanProjectNames called!");
         console.log("cleanJson");
         console.log(cleanJson);
     }


     var printResultComparison = 0;

    function _getProjDisplayLabel(rawProjName){
        var fixedName;
        if (!_.isEmpty(rawProjName)){
            if (rawProjName.includes("-")){
                fixedName = rawProjName.substr(0, rawProjName.indexOf('-'));
            } else {
                fixedName = rawProjName;
            }
            //strip all leading and trailing whitespace
            fixedName = fixedName.replace(/^\s+|\s+$/g,'');

            return fixedName;
        } else {
            return "NoProjName";
        }
    }

     /**
      * Fix Project Names
      */
     _.forEach(cleanJson, function(ck) {
         var groupName = _getProjDisplayLabel(ck.salesForceProjectName);
         ck.projectDisplayName = groupName;
     });

     if (printResultComparison === 1 || main.config.debug){
         _.forEach(cleanJson, function(ck){
             var groupName = _getProjDisplayLabel(ck.salesForceProjectName);
             console.log("==================");
             console.log("Client Name:" + ck.clientName);
             console.log("Raw Project Name");
             console.log("===");
             console.log(ck.projectName);
             console.log("===");
             console.log("Condensed Project Name");
             console.log("===");
             console.log(groupName);
             console.log("===");
             console.log("Practice:" + ck.practice);
             console.log("Region:" + ck.region);
             console.log("Project Manager:" + ck._createProjManager);
             console.log("Start Date:");
             console.log(ck.startDate);
             console.log("End Date:");
             console.log(ck.endDate);
         });
     }

     //save cleanJson to the main for safe keeping
     main.data.projects = _.clone(cleanJson);

     callback(null, writeProjectFiles);
}

function addAssignments(handleError, callback) {
        var combined = [];

    /** Target format
     * {
             "title": "Senior Architect",
             "responsibilities": "Web application architecture",
             "assignmentName": "salesforce assignment name",
             "filledBy": [
                 {
                 "userId": "33cd654a2",
                 "startDate": "2000-01-01",
                 "endDate": "2002-01-01"
                 }
             ],
             "positionSkills": [
                 "Elasticsearch",
                 "Python",
                 "Flask"
             ]
             }
     */

        _.forEach(main.data.projects, function(proj){
            var positions = [];
            var matchingAssignments = _.filter(main.data.assigments, function(assn){
                return assn.Project === proj.salesForceProjectName;
            });
            _.forEach(matchingAssignments, function(matchngAssn){
                var filledByData = {};
                filledByData.userFullName = matchngAssn["Resource"];
                filledByData.startDate = moment(matchngAssn["Start Date"], "M/D/yyyy").format("YYYY-MM-DD");
                filledByData.endDate = moment(matchngAssn["End Date"], "M/D/yyyy").format("YYYY-MM-DD");
                var positionWrapper = {};
                positionWrapper.assignmentName = matchngAssn["Assignment Name"];
                positionWrapper.filledBy = [];
                positionWrapper.filledBy.push(filledByData);
                positions.push(positionWrapper);
            });
            proj.positions = positions;
        });

        callback(null, done, main.data.projects);
}


function writeProjectFiles(handleError, callback, projectData){
    if (main.config.debug){
        console.log(JSON.stringify(projectData, null, 4));
    }

    _.forEach(projectData, function(node){
        var filename = node.salesforceRecordId + '.json';
        var filepath = process.env.RW_GIT_BASE_DIR + '/data/projects/toLoad/' + filename;
        var contents = file.writeFile(filepath, JSON.stringify(node, null, 4),
            function(error){
                console.log("writing: " + filepath);
                if (error){
                    console.log("Arrgggghh! Error: ");
                    console.log(error);
                }
            }
        );
    });

    callback(null, null);
}

function done(handleError, callback, data){
        console.log("condense-projects.js process completed");
        console.log("===========");
    //process.exit();
}




