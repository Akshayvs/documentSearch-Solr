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
        res.sendfile('./index.html');
    });

    app.post('/key', function (req, res) {
        
        var documentStringTemp = req.body.key;
        var documentString = documentStringTemp.replace(/ /g, ''); // elinimating whitespaces
        var keysArray_withDuplicate = documentString ? documentString.split(',') : [];
        keys = lodash.uniq(keysArray_withDuplicate); // Eliminating duplicates
        console.log(keys);

        lookupApi.init(keys, res);
        //resp.sendfile('./fieldSearch.html');
    });

    app.post('/values', function (req, res) {
        console.log(req.body);
        var valueStringTemp = req.body.key;
        var valueString = valueStringTemp.replace(/ /g, ''); // elinimating whitespaces
        var values_PossibleDuplicates = valueString ? valueString.split(',') : [];
        searchFields = lodash.uniq(values_PossibleDuplicates);
        console.log(searchFields);

        //lookupApi.init(keys, res);
        var res_obj = {name: 'akshay', university: 'George Mason University'}
        res.send(200, res_obj)
    });

    app.listen(3000, function () {
        console.log('server active : http://127.0.0.1:3000');
    });
}
main();
