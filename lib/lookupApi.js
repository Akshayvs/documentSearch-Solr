
'use strict';

var search = require('./getDoc');
var solrInterface = require('./solrInterface')
var LookupApi;
module.exports = LookupApi = {

    init: function (keys, res) {
        search(keys, callback);

        function callback(err, cbDoc_Array) {
            if (err) res.send(404, err);

            else solrInterface(cbDoc_Array, res);
            //res.send(200,cbDoc_Array);
        }
    }
}