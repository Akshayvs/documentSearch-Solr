'use strict';
var myBucket = require('./cbConnect');
//searches a document in the DB, if found, calls the Search callback, else error
module.exports = function search(keys, callback) {
    var cbDoc_Array = [];

    myBucket.getMulti(keys, function (error, results) {

        var documentKeys;
        var document;
        var counter=0;
        
        documentKeys = Object.keys(results);
        console.log('DOCUMENT_KEYS:' + documentKeys);

        documentKeys.forEach(function (documentKey) {
            document=results[documentKey];
            counter++;
            if (!document.error) {
                cbDoc_Array.push(document);
            }
        });
        setTimeout(function(){
        console.log('HERE IS THE ARRAY ! :'+ JSON.stringify(cbDoc_Array) );
        callback(null,cbDoc_Array);
        },2000)
    });
}