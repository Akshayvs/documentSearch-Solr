'use strict';

var index = require('../index');
var express = require('express');
var path = require('path');
var lodash = require('lodash');
var app = express();


function searchApi(res) {

    res.sendfile(path.resolve('../documentSearch-Solr/frontEnd/fieldSearch.html'));

    app.post('/values', function (req, res){});

};


module.exports = searchApi;