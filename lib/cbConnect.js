'use strict';

var couchbase = require('couchbase');
var config= require('config');

var credentials=config.gannett;
var username=credentials.bucket_username;
var password=credentials.bucket_password;
var ip=credentials.couchbase_cluster_ip;

var myCluster = new couchbase.Cluster(ip);
var myBucket = myCluster.openBucket(username,password, function(err) {

    if (err) {
        throw err;
    }
    else {
        console.log("\n 2. COUCHBASE CONNECTED \n");
        console.log(" KEY : asset_-1464108288001_assetlite \n" +
            " KEY_small :  asset_-1464108288001_meta \n"+
            "FieldsRequested=assetGroup,assetTypeName,datePublished,ssts \n");
    }
});
module.exports=myBucket;
