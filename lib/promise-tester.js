'use strict';
var config= require('../config/default');
var couchbase = require('couchbase');
var credentials=config.gannett;
var username=credentials.bucket_username;
var password=credentials.bucket_password;
var ip=credentials.couchbase_cluster_ip;

var myCluster = new couchbase.Cluster(ip);
var myBucket = myCluster.openBucket(username,password, function(err) {
    if (err) {throw err;}
    else {console.log("\n 2. COUCHBASE CONNECTED \n");}
});


var keys =  ['asset_-1464108288001_contentlite' , 'asset_-1464108288001_assetlite'];

function getDocsFrom_Couchbase(keys) {
    var cbDoc_Array =[];

  //ASYNC FUNCTION !

    myBucket.getMulti(keys, function (error, results) {
        var documentKeys;
        var document;
        var counter=0;

        documentKeys = Object.keys(results);
        documentKeys.forEach(function (documentKey) {
            document=results[documentKey];
            counter++;

            if (!document.error) {
                var documentHolder= document['value'];  // document associated with the valid keys are incapsulated in a key value pair which is pointed by the VALUE field
                cbDoc_Array.push(documentHolder);
            }
        });


    }  );

    console.log('HERE IS THE ARRAY ! :'+ JSON.stringify(cbDoc_Array) );
    console.log(cbDoc_Array);
}

getDocsFrom_Couchbase(keys);