'use strict';

var solr = require('solr-client');
var config = require('config');
var solrConfig = config.solrlocal;

var client = solr.createClient(solrConfig );
client.autoCommit = true;


function indexSearch(query, res) {

    console.log('indexSearchSTARTED');
    var queryString=query['values'];
    console.log(queryString);


    client.get('select', queryString, function(err, obj){

        if(err){
            console.log('OBJECT INDEXING FAILED!!')
            console.log(err);
            res.status(500).send(err);
        }
        else{

            console.log('object returned from index: ' + obj);

            res.status(200).send(obj);
        }
    });
}
module.exports = indexSearch;

