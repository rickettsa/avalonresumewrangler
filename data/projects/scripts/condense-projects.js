#!/usr/bin/env node
var Converter = require("csvtojson").Converter;
var _ = require("lodash");
var async = require("async");

var main = main || {};

main.session = {};
main.config = {};
main.data = {};

main.config.csvFiles = [
    {
        "objectName": "assigments",
        "filepath": "/Users/abembecker/Development/Avalon/resumeWrangler/BeanStalk_AvalonResumeWrangler/data/projects/data-samples/assignments.csv"
    },
    {
        "objectName": "projects",
        "filepath": "/Users/abembecker/Development/Avalon/resumeWrangler/BeanStalk_AvalonResumeWrangler/data/projects/data-samples/rw-accs-projects.csv"
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
    if (error) return console.error('Uhoh, there was an error', error);
}

init(handleError, convertCsvToJson);

function init(handleError, callback){
    console.log("main.init called!");

    //console.log(main.config.csvFiles);


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

    console.log("convertCsvToJson");
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
    console.log("cleanRawJson called!");
    // console.log("rawJson:");
    // console.log(rawJson);
    var cleanJson = [];
        _.forEach(rawJson, function(row){
            var keys = _.keys(row);
            var newObj = {};
            _.forEach(keys, function(k){
                var nospaceKey = k.replace(" ", '_'); //get rid of spaces
                var normKey = nospaceKey.toLowerCase();
                /* if a key translator matches, change the name of the key */
                if (main.config.jsonKeyTranslator.hasOwnProperty(normKey)){
                    var transName = main.config.jsonKeyTranslator[normKey];
                    newObj[transName] = row[k];
                } else {
                    newObj[normKey] = row[k];
                }
            });
            cleanJson.push(newObj);
        });
    callback(null, addAssignments, cleanJson);
}


 function cleanProjectNames(handleError, callback, cleanJson){
        console.log("cleanProjectNames called!");
        // console.log("cleanJson");
        // console.log(cleanJson);

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
            return "NoProjName"
        }
    }

     /**
      * Fix Project Names
      */
     _.forEach(cleanJson, function(ck) {
         var groupName = _getProjDisplayLabel(ck.salesForceProjectName);
         ck.projectDisplayName = groupName;
     });

     if (printResultComparison === 1){
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

     callback(null, done, cleanJson);
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
                filledByData.userId = matchngAssn["Resource"];
                filledByData.startDate = matchngAssn["Start Date"];
                filledByData.endDate = matchngAssn["End Date"];
                var positionWrapper = {};
                positionWrapper.assignmentName = matchngAssn["Assignment Name"];
                positionWrapper.filledBy = [];
                positionWrapper.filledBy.push(filledByData);
                positions.push(positionWrapper);
            });
            proj.positions = positions;
        });

        callback(null, printProjData, main.data.projects);
}


function printProjData(handleError, callback, projectData){
    console.log(JSON.stringify(projectData, null, 4));
    callback(null, null);
}



function done(handleError, callback, data){hhh
    console.log("DONE");
    //process.exit();
}




