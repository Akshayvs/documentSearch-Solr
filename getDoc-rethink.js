'use strict';


// IN THIS FUNCTION, TYR TO ELIMINATE THE PROBLEM OF  THE FINAL IF-ELSE STATEMENT EXECUTING BEFORE THE CALLBACK FUNCTION IS EXECUTED
var myBucket = require('./cbConnect');
var lodash = require('lodash');
//searches a document in the DB, if found, calls the Search callback, else error

module.exports = function search(documentKeys, callback) {
    var cbDoc_Array=[];
    var err;

    function multiGet( search) {}

    documentKeys.forEach(function(searchKey){

        /*logic to make sure all the keys that are provided are valid - Three cases
         1. all keys invalid=  throw error;
         2. some valid = should procede only with the valid keys
         3. all valid = should procede with all keys*/

        myBucket.get(searchKey, function (err, result) {
            if (err) {
                console.log("INVALID KEY VALUE\n");
            }
            else {
                console.log("DOCUMENT FOUND = : \n" + JSON.stringify(result.value) +'\n');
                cbDoc_Array.push(result.value);
                cbDoc_Array.push(5);
                console.log("ALL DOCUMENTS FOUND ARE = : \n" + cbDoc_Array.length +'\n');
            }
        });
    })

    if (cbDoc_Array.length==0){
        console.log("ALL PROVIDED KEYS ARE INVALID");
        callback('err',null);
    }
    else {
        console.log("ALL DOCUMENTS FOUND ARE = : \n" + JSON.stringify(cbDoc_Array.value) +'\n');
        //callback(null,cbDoc_Array);
    }

}