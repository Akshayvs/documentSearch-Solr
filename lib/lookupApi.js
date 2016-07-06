/**
 * Created by asonawane on 7/6/16.
 */
'use strict';

var search = require('./getDoc');
var LookupApi;
module.exports = LookupApi = {

    init: function (documentKeys, res) {
        var keys = documentKeys;
        var extrctedKeys = keys ? keys.split(',') : [];

        search(extrctedKeys, callback);

        function callback(err, cbDoc) {
            if (err) {
                res.send(404);
            }
            else {
                res.send(200, cbDoc);
            }
        }

    }
}