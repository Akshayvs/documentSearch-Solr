'use strict';

var solr = require('solr-client');
var config = require('config');
var solrConfig = config.solrlocal;

var client = solr.createClient(solrConfig );
client.autoCommit = true;


function indexSearch(query, res) {

    var queryString=query['values'];
    console.log(queryString);


    client.get('select', queryString, function(err, obj){

        if(err){
            console.log('OBJECT INDEXING FAILED!!')
            console.log(err);
            res.send(404, err);
        }
        else{

            console.log('object returned from index: ' + obj);
            res.send(200, obj);
        }
    });
}
module.exports = indexSearch;

