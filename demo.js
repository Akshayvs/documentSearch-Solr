var solr = require('solr-client');
var config=require('config');
var solrConfig=config.solrlocal;

var client = solr.createClient({
    host: 'localhost',
    port: 8983,
    path: '/solr',
    core: 'testCore'
});
client.autoCommit = true;

var obj={ "id" : 121, "title_t" : "WINNER_3!", "firstNameis" :"AkshayVS" }

client.add(obj,function(err,obj){
    if(err){
        console.log(err);
    }else{
        client.softCommit();
        console.log('Solr response:', obj);
    }
});