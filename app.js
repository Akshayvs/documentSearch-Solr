'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var lodash=require('lodash');

var fs=require('fs');
var app = express();
var lookupApi=require('./lib/lookupApi');
function main(){

var documentKeys
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendfile('./index.html');

});

app.post('/key', function (req, res) {
    console.log(req.body);
    var documentObject = req.body;
    var documentString = documentObject.key;
    
    var documentKeys_PossibleDuplicates = documentString ? documentString.split(',') : [];
    documentKeys=lodash.uniq(documentKeys_PossibleDuplicates ); // Eliminating duplicates
    console.log(documentKeys);

    lookupApi.init(documentKeys,res);
    
});

app.listen(3000, function () {
    console.log('server active : http://127.0.0.1:3000');
});

}
main();
module.exports= main;