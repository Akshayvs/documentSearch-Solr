'use strict';

var solr = require('solr-client');
var config = require('config');
var solrConfig = config.solrlocal;
var express = require('express');
var path = require('path');


// function connects to a solr client and indexes to solr; the documents provided as input.
// at the end of everything, sends a html file to continue with the second part of the program

var client = solr.createClient(solrConfig);
client.autoCommit = true;

function indexer(cbDoc_Array, res) {

    cbDoc_Array.forEach(function (cbDoc) {

        //console.log("value of each cbDoc in cbDocArray : " + JSON.stringify(cbDoc))
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
        res.sendFile(path.resolve('../documentSearch-Solr/frontEnd/fieldSearch.html'));
    }, 1500)
}
module.exports = indexer;

