'use strict';


// IN THIS FUNCTION, TYR TO ELIMINATE THE PROBLEM OF  THE FINAL IF-ELSE STATEMENT EXECUTING BEFORE THE CALLBACK FUNCTION IS EXECUTED
var myBucket = require('./cbConnect');
var lodash = require('lodash');
//searches a document in the DB, if found, calls the Search callback, else error

module.exports = function search(keys, callback) {
    var cbDoc_Array = [];

    myBucket.getMulti(keys, function (error, results) {
        if (error) callback(error);

        for(var i=0;i< results.length;i++){
            var jsonDoc= results[i];
            var flagged= object.keys(jsonDoc);



        }
        
            if(jsonDoc.flagged.hasOwnProperty('error')){

            }
            else{
                cbDoc_Array.push((jsonDoc));
                console.log('**CBDOC ARRAY VALUES :'+ cbDoc_Array );
            }






        // results.forEach(function (JSdoc) {
        //
        //     if (JSdoc.hasOwnProperty('error')) {
        //         console.log('ERROR AT KEY: ' + jsDoc);
        //     }
        //     else {
        //         cbDoc_Array.push(results[JSdoc]);
        //         console.log('CBDOC ARRAY :' + JSON.stringify(cbDoc_Array));
        //     }
        //
        // });
        console.log('***:' + JSON.stringify(results));
        // Object.keys(results).forEach(function(JSdoc) {
        //
        //     //if (results[JSdoc] == 'error')
        //     if (results[JSdoc].error)
        //     {
        //         //cbDoc_Array.push({searchKey: JSdoc, value: 'got an error'});
        //     } else {
        //        // cbDoc_Array.push({searchKey: JSdoc, value: results[JSdoc]});
        //         cbDoc_Array.push(results[JSdoc]);
        //     }
        // });
        // console.log(JSON.stringify(cbDoc_Array));
        // callback(cbDoc_Array);
    });
}