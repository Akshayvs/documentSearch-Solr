var solr = require('solr-client')
var client = solr.createClient({
    host: 'localhost',
    port: 8983,
    path: '/solr',
    core: 'tester'
});

// Switch on "auto commit", by default `client.autoCommit = false`
client.autoCommit = true;

var docs = [];
for(var i = 0; i <= 42 ; i++){
    var doc = {
       id : 12345 + i,
        title : "Title "+ i,
        description: "Text"+ i + "Alice"
    }
    docs.push(doc);
}

// Add documents
client.add(docs,function(err,obj){
    if(err){
        console.log(err);
    }else{
        client.softCommit();
        console.log(obj);
    }
});