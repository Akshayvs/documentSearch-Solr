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
    console.log('SOLR INDEXER STARTED');
    console.log('CBDOCARRAY @ SOLR INDEXER' + cbDoc_Array);
    var count = 0;
    var cbDoc_Arraylength = cbDoc_Array.length;

    console.log('COUNT :' +count);
    console.log('Arraylength:' +cbDoc_Arraylength);

    cbDoc_Array.forEach(function (cbDoc) {
        count++;
// count is incremented BEFORE each async call. - logic fails if count is incremented AFTER async call
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

    if (count == cbDoc_Arraylength) {
        res.sendFile(path.resolve('../documentSearch-Solr/frontEnd/SOLRqueryReceiver.html'));
    }
}
module.exports = indexer;