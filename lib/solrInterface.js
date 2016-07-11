'use strict';

var solr = require('solr-client');
var config=require('config');
var solrConfig= config.solrlocal;
var express = require('express');
var path=require('path');
var searchApi=require('./searchApi');

var client = solr.createClient(config.solrlocal);
client.autoCommit = true;


function solrInterface(cbDoc_Array,res){
    
    cbDoc_Array.forEach(function(multiGet_Doc){
/*
        The cbDoc_Array would contain key value pairs of the format
        { cas:122234234,
        value : { the actual document that is required}
        but we are only interested in the DOC
        cbDoc is retreiving only the actual document  from the rest.
*/
        var cbDoc=multiGet_Doc['value'];

        console.log("CB_DOC: TRYING TO INDEX =" + JSON.stringify(cbDoc))
        client.add(cbDoc,function(err,obj){
           
            if(err){
                console.log(err);
                console.log('SOLR INTERFACE CRASHED \n');
                res.send(200, err);
            }else{
                client.softCommit();
                console.log('SOLR RESPONSE:\n', obj);
            }
            
            
            
            res.send(obj);
        });


    })


}
module.exports=solrInterface;

