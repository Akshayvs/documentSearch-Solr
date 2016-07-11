'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var lodash = require('lodash');
var fs = require('fs');
var app = express();
var lookupApi = require('./lib/lookupApi');

function main() {
    var keys;
    var searchFields;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

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

    app.listen(3000, function () {
        console.log('1. SERVER ACTIVE: http://127.0.0.1:3000');
    });
}
main();
