'use strict';

var config = require('config');
var solrConfig = config.solrlocal;
var path = require('path');

var solr = require('solr-client');
var client = solr.createClient(solrConfig);
client.autoCommit = true;


// function connects to a solr client and indexes to solr; the documents provided as input.
// at the end of everything, sends a html file to continue with the second part of the program

function indexer(cbDoc_Array, res) {
    
    var count = 0;
    var cbDoc_Arraylength = cbDoc_Array.length;

    cbDoc_Array.forEach(function (cbDoc) {
        count++;
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