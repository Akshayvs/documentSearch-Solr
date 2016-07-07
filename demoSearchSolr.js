/**
 * Created by asonawane on 7/7/16.
 */
var solr = require('solr-client');

var client = solr.createClient({
    host: 'localhost',
    port: 8983,
    path: '/solr',
    core: 'testCore'
});



var query = client.createQuery()
    .q('hello')
    .dismax()
    .qf({title_t : 0.2 , description_t : 3.3})
    .mm(2)
    .start(0)
    .rows(10);


client.search(query,function(err,obj){
    if(err){
        console.log(err);
    }else{
        console.log(obj);
    }
});
