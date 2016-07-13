'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var lodash = require('lodash');
var fs = require('fs');

var lookupApi = require('./lib/lookupApi');
var indexSearch = require('./lib/indexSearch');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


function main() {
    var keys;
    app.get('/', function (req, res) {
        res.sendfile('./frontEnd/index.html');
    });

    app.post('/key', function (req, res) {
        console.log(req.body);
        var stringofKeys_inRequest = req.body.key;
        var string_withoutSpace = stringofKeys_inRequest.replace(/ /g, ''); // elinimating whitespaces
        var keys_withDuplicate = string_withoutSpace ? string_withoutSpace.split(',') : [];
        keys = lodash.uniq(keys_withDuplicate); // Eliminating duplicates
        console.log(keys);
        lookupApi.init(keys, res);
    });


}
main();
setTimeout(function () {

    app.post('/values', function (req, res) {
        var query = req.body;
        console.log('QUERY IS: ' + JSON.stringify(query));
        indexSearch(query, res);

    });
},5000)





app.listen(3000, function () {
    console.log('1. SERVER ACTIVE: http://127.0.0.1:3000');
});

