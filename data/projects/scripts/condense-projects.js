#!/usr/bin/env node
var Converter = require("csvtojson").Converter;
var _ = require("lodash");

console.log("***** starting condense-projects.js *****");

var main = main || {};

main.init = function(){

    var converter = new Converter({});
    converter.fromFile("../data-samples/rw-accs-projects.csv",function(err,results){
        console.log(err);
        //console.log(results);

        /** Clean up json structure to make it easy to use **/
        var cleanKeys = [];
        _.forEach(results, function(row){
            var keys = _.keys(row);
            var newObj = {};
            _.forEach(keys, function(k){
                var nospaceKey = k.replace(" ", '_'); //get rid of spaces
                var normKey = nospaceKey.toLowerCase();
                newObj[normKey] = row[k];
            });
            cleanKeys.push(newObj);
        });
        //console.log(cleanKeys);

        function _getGroupProjName(rawProjName){
            return rawProjName.substr(0, rawProjName.indexOf('-'));
        }

        _.forEach(cleanKeys, function(ck){
            var groupName = _getGroupProjName(ck.project_name);
            console.log("==================");
            console.log("Raw Project Name:");
            console.log(ck.project_name);
            console.log("Group Project Name:");
            console.log(groupName);
        });


    });
}
main.init();

