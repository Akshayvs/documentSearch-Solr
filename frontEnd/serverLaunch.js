'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var fs=require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.sendfile('./index.html');

});

app.post('/key', function (req, res) {
    console.log(req.body);
    var documentObject = req.body;
    var documentString = documentObject.key;
    var documentKeys = documentString ? documentString.split(',') : [];
    console.log(documentKeys);
});

app.listen(3000, function () {
    console.log('server active : http://127.0.0.1:3000');
});