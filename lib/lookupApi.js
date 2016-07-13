'use strict';

var searchKeys_inCouchbase = require('./getDocsFrom_Couchbase');
var indexer = require('./solrIndexer')


var LookupApi;
module.exports = LookupApi = {

    init: function (keys, res) {
        searchKeys_inCouchbase(keys, callback);

        function callback(err, cbDoc_Array) {
            if (err) {
                res.send(404, err)
            }

            else {
                indexer(cbDoc_Array, res);
            }
        }
    }
}