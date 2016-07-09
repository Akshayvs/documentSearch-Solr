'use strict';

var solr = require('solr-client');
var config=require('config');
var solrConfig= config.solrlocal;
var express = require('express');
var path=require('path');

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

            setTimeout(function () {



                res.sendfile(path.resolve('../documentSearch-Solr/frontEnd/fieldSearch.html'));



            })
        });



    })


}
module.exports=solrInterface;

