#!/usr/bin/env node

//Converter Class
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
converter.fromFile("./file.csv",function(err,result){

});