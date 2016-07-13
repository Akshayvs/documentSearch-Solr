'use strict';
var myBucket = require('./cbConnect');
//searches a document in the DB, if found, calls the Search callback, else error



module.exports = function getDocsFrom_Couchbase(keys, callback) {
    var cbDoc_Array = [];
    
    myBucket.getMulti(keys, function (error, results) {
        var documentKeys;
        var document;
        var counter=0;

        console.log(' getDocFrom_Couchbase STARTED');

        documentKeys = Object.keys(results);


        documentKeys.forEach(function (documentKey) {
            document=results[documentKey];
            counter++;

            /*
             The cbDoc_Array would contain key value pairs of the format
             { cas:122234234,
             value : { the actual document that is required}
             but we are only interested in the DOC
             cbDoc is retreiving only the actual document  from the rest.
             */
            if (!document.error) {
                var documentHolder= document['value'];  // document associated with the valid keys are incapsulated in a key value pair which is pointed by the VALUE field
                cbDoc_Array.push(documentHolder);
            }
        });
        console.log('HERE IS THE ARRAY ! :'+ JSON.stringify(cbDoc_Array) );
        callback(null,cbDoc_Array);

    });
}