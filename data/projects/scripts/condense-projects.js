#!/usr/bin/env node
var Converter = require("csvtojson").Converter;
var _ = require("lodash");
var async = require("async");

var main = main || {};

GLOBAL.session = {};
GLOBAL.config = {};
GLOBAL.config.projects = {};

GLOBAL.config.csvFiles = [
    {
        "objectName": "projects",
        "filepath": "/Users/abembecker/Development/Avalon/resumeWrangler/BeanStalk_AvalonResumeWrangler/data/projects/data-samples/rw-accs-projects.csv"
    }
];

GLOBAL.config.projects.jsonKeyTranslator = {
    "account": "clientName",
    "project_name": "projectName",
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

    //console.log(GLOBAL.config.csvFiles);


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
    _.forEach(GLOBAL.config.csvFiles, function(csvFil){
        var converter = new Converter({});
            converter.fromFile(csvFil.filepath, function(err,results){
                if (err){
                    handleError(err);
                } else {
                    callback(null, cleanProjectNames, results);
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
                if (GLOBAL.config.projects.jsonKeyTranslator.hasOwnProperty(normKey)){
                    var transName = GLOBAL.config.projects.jsonKeyTranslator[normKey];
                    newObj[transName] = row[k];
                } else {
                    newObj[normKey] = row[k];
                }
            });
            cleanJson.push(newObj);
        });
    callback(null, done, cleanJson);
}


 function cleanProjectNames(handleError, callback, cleanJson){
        console.log("cleanProjectNames called!");
        // console.log("cleanJson");
        // console.log(cleanJson);

    function _getGroupProjName(rawProjName){
        if (rawProjName.includes("-")){
            return rawProjName.substr(0, rawProjName.indexOf('-'));
        } else {
            return rawProjName;
        }
    }

    _.forEach(cleanJson, function(ck){
        var groupName = _getGroupProjName(ck.projectName);
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

     callback(null, null);
}

function done(handleError, callback){
    console.log("DONE");
}




