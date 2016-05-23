var jsforce = require('jsforce');
var _ = require("lodash");
var moment = require("moment");
var file = require("fs");

var conn = new jsforce.Connection(
    // { loginUrl : 'https://test.salesforce.com' }
    { loginUrl : 'https://avalonconsult.my.salesforce.com' }
);

var queryMeta = [
    {
        "dataSet": "users",
        "query": 'SELECT CreatedDate,Division,Email,FirstName,FullPhotoUrl,Id,IsActive,LastLoginDate,LastModifiedById,LastModifiedDate,LastName,ManagerId,MobilePhone,Name,Phone,State,Title,UserRoleId,UserType FROM User'
    },
    {
        "dataSet": "projects",
        "query": 'SELECT pse__Account__r.Name, Name, pse__Project_Manager__r.Name, pse__Project_Manager__r.Email, pse__Region__r.Name, pse__Practice__r.Name, pse__Start_Date__c, pse__End_Date__c, Id FROM pse__Proj__c'
    },
    {
        "dataSet": "assignments",
        "query": 'SELECT assn.Id,assn.LastModifiedDate,assn.Name,assn.OwnerId,assn.pse__Project__c,assn.pse__Project__R.Name,assn.pse__Resource__c,assn.pse__Resource__R.Email,assn.pse__Start_Date__c,assn.pse__End_Date__c,assn.pse__Resource__R.FirstName,assn.pse__Resource__R.LastName,assn.pse__Role__c FROM pse__Assignment__c assn'
    }
];

function handleError (error) {
    if (error) return console.error('Uh-oh, there was an error', error);
}

init(handleError, done);

function init(err, done){

    for (var i=0;i<queryMeta.length;i++){
        runQuery(queryMeta[i]);
    }
}

function done(){
    console.log("Salesforce API download script done..");
}

function runQuery(queryMeta){
    conn.login(process.env.SF_USER, process.env.SF_PASS, function(err, res) {
        if (err) { return console.error(err); }
        conn.query(queryMeta.query,
            function(err, res) {
                if (err) { return console.error(err); }
                //console.log("Got results for: " + queryMeta.dataSet);
                //console.log( JSON.stringify(res, null, 4) );
                writeFile(queryMeta, res);
            });
    });
}

function writeFile(queryMeta, res){
    var myDate = moment().format("MM-DD-YYYY");

    var filename = myDate + "_" + queryMeta.dataSet + '.json';
    var filepath = process.env.RW_GIT_BASE_DIR + '/data/projects/salesforce-data/' + filename;
    var contents = file.writeFile(filepath, JSON.stringify(res, null, 4),
        function(error){
            console.log("writing: " + filepath);
            if (error){
                console.log("Arrgggghh! Error: ");
                console.log(error);
            }
        }
    );
}

//https://jsforce.github.io/document/#connection

// Projects Query
// SELECT pse__Account__r.Name, Name, pse__Project_Manager__r.Name, pse__Project_Manager__r.Email, pse__Region__r.Name, pse__Practice__r.Name, pse__Start_Date__c, pse__End_Date__c, Id FROM pse__Proj__c

// Assignments Query
// SELECT assn.Id,assn.LastModifiedDate,assn.Name,assn.OwnerId,assn.pse__Project__c,assn.pse__Project__R.Name,assn.pse__Resource__c,assn.pse__Resource__R.Email,assn.pse__Start_Date__c,assn.pse__End_Date__c,assn.pse__Resource__R.FirstName,assn.pse__Resource__R.LastName,assn.pse__Role__c FROM pse__Assignment__c assn

// Combined - not working
// SELECT pse__Account__r.Name, Name, pse__Project_Manager__r.Name, pse__Project_Manager__r.Email, pse__Region__r.Name, pse__Practice__r.Name, pse__Start_Date__c, pse__End_Date__c, Id, (SELECT Id,LastModifiedDate,Name,OwnerId,pse__Resource__c,pse__Resource__R.Email,pse__Start_Date__c,pse__End_Date__c,pse__Resource__R.FirstName,pse__Resource__R.LastName,pse__Role__c FROM pse__Proj__c.pse__Assignment__cs) FROM pse__Proj__c

// User Query - needs to happen _first_
// SELECT CreatedDate,Division,Email,FirstName,FullPhotoUrl,Id,IsActive,LastLoginDate,LastModifiedById,LastModifiedDate,LastName,ManagerId,MobilePhone,Name,Phone,State,Title,UserRoleId,UserType FROM User