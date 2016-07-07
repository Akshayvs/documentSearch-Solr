'use strict';

var myBucket = require('./cbConnect');
var lodash = require('lodash');
//searches a document in the DB, if found, calls the Search callback, else error

module.exports = function search(documentKeys, callback) {

    var cbDoc
    for (var i = 0; i < documentKeys.length; i++) {
        var count = 0;
        var searchKey = documentKeys[i];
        myBucket.get(searchKey, function (err, result) {
            if (err) {
                console.log("INVALID KEY VALUE\n"); //count logic is for handling one invalid key out of multiple inputs.
                if (count == 0) {
                    callback(err);
                }
            }
            else {
                console.log("DOCUMENT FOUND = : \n" + JSON.stringify(result.value) +'\n');
                cbDoc = result.value;
                callback(null, cbDoc);
                count = count + 1;
            }
        });
    }

}