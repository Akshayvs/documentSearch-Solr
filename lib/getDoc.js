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
                console.log('Added to cbDoc_Array :' + JSON.stringify(document));
            }
        });

        var temp=documentKeys.length;
        if(counter== temp-1){
            console.log('HERE IS THE ARRAY ! :'+ cbDoc_Array );
            callback(null,cbDoc_Array);
        }
    });
}