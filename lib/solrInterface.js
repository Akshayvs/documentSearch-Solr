'use strict';

var solr = require('solr-client');
var config=require('config');
var solrConfig= config.solrlocal;
var express = require('express');

var client = solr.createClient(solrConfig);
client.autoCommit = true;


function solrInterface(cbDoc_Array,res){
    
    cbDoc_Array.forEach(function(cbDoc){

        client.add(cbDoc,function(err,obj){
           
            if(err){
                console.log(err);
                console.log('SOLR INTERFACE CRASHED \n');
                res.send(200, err);
            }else{
                client.softCommit();
                console.log('Solr response:\n', obj);
            }
            var temp=cbDoc_Array.length;

            setTimeout(function () {
                res.sendfile('./fieldSearch.html');
            })
        });



    })


}
module.exports=solrInterface;

