'use strict';


// IN THIS FUNCTION, TYR TO ELIMINATE THE PROBLEM OF  THE FINAL IF-ELSE STATEMENT EXECUTING BEFORE THE CALLBACK FUNCTION IS EXECUTED
var myBucket = require('./cbConnect');
var lodash = require('lodash');
//searches a document in the DB, if found, calls the Search callback, else error

module.exports = function search(keys, callback) {
    var cbDoc_Array = [];

    myBucket.getMulti(keys, function (error, results) {

        if (error) {
        }

        console.log('results :===' +results+'\n');
        console.log('results stringified:===' +JSON.stringify(results)+'\n');


        var flagged = Object.keys(results);
        console.log('FLAGGED:'+ flagged);

        for(var i=0; i<flagged.length;i++){

            var flag2=Object.keys(results[flagged]);

            if (results.flagged.hasOwnProperty('error') ) {

            }
            else {
                cbDoc_Array.push((jsonDoc));
                console.log('**CBDOC ARRAY VALUES :' + cbDoc_Array);
            }

        }



        //callback(null,results);


        /*for(var i=0;i< results.length;i++) {
         var jsonDoc = results[i];
         var flagged = object.keys(jsonDoc);

         if (flagged.hasOwnProperty('error')) {

         }
         else {
         cbDoc_Array.push((jsonDoc));
         console.log('**CBDOC ARRAY VALUES :' + cbDoc_Array);
         }
         }*/
    });
}