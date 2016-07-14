'use strict';

var searchKeys_inCouchbase = require('./getDocsFrom_Couchbase');
var indexer = require('./solrIndexer')


var LookupApi;
console.log('LookupApi STARTED');

module.exports = LookupApi = {

    init: function (keys, res) {

        searchKeys_inCouchbase(keys, callback);

        function callback(err, cbDoc_Array) {
            if (err) {
                res.send(404, err)
            }

            else {

              //  res.send(200,cbDoc_Array)
                indexer(cbDoc_Array, res);
            }
        }
    }
}