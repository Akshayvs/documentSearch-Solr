'use strict';

var solr = require('solr-client');
var config = require('config');
var solrConfig = config.solrlocal;
var express = require('express');
var path = require('path');

var client = solr.createClient(config.solrlocal);
client.autoCommit = true;


function solrInterface(cbDoc_Array, res) {

    cbDoc_Array.forEach(function (cbDoc) {

        console.log("value of each cbDoc in cbDocArray : " + JSON.stringify(cbDoc))
        client.add(cbDoc, function (err, obj) {

            if (err) {
                console.log(err);
                console.log('SOLR INTERFACE CRASHED \n');
                res.send(200, err);
            } else {
                client.softCommit();
                console.log('SOLR RESPONSE:\n', obj);
            }
        });
    })

    setTimeout(function () {

        var response_message={
            message : 'all files indexed without any error'
        }

        res.send(response_message);
    }, 2000)
}
module.exports = solrInterface;

