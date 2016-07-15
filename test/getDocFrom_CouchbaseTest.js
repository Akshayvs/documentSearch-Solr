'use strict';

var assert = require('assert');
var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');


describe('should getMultiple docs from Couchbase and parse the response JSON', function () {

    var getDocsFrom_Couchbase;
    var myBucketStub;
    var callbackStub = sinon.spy();
    var getMulti = sinon.stub();
    var searchKey = ['key1', 'key2'];
//define a exact result json
    var results = {
        error: {
            message: "The key does not exist on the server",
            code: 13
        },
        asset_1464108288001_contentlite: {
            cas: "160464081146132",
            value: {
                document: 'data1',
                fiend: 'two',
                field: 'three'
            }
        }
    };

    getMulti.withArgs(['key1', 'key2']).callsArgWith(1, null, results);
    getMulti.withArgs([]).callsArgWith(1, 'err');

    before (function () {

        mockery.enable({useCleanCache: true});

        myBucketStub = {getMulti: getMulti};

        mockery.registerAllowable('../lib/getDocFrom_CouchbaseTest.js');
        mockery.registerMock('./cbConnect', myBucketStub);
        getDocsFrom_Couchbase = require('../lib/getDocsFrom_Couchbase');
    });

    after('disable mockery', function () {
        mockery.resetCache();
        mockery.deregisterMock('couchbase');
        mockery.disable();
    });

    //========================================== TESTS ==========================================

    it('makes a call to myBucket.GetMulti', function(){
        getDocsFrom_Couchbase(searchKey, callbackStub);
        assert.equal(getMulti.callCount, 1);
    });

    it('should callgetMulti function with KEYS' , function () {
        getDocsFrom_Couchbase(searchKey, callbackStub);
        expect(getMulti.calledWith(['key1', 'key2'])).to.equal(true);
    });

    it('should return a JSON document to CALLBACK', function(){
        getDocsFrom_Couchbase(searchKey, callbackStub);
        expect(callbackStub.calledWith( null, results)).to.equal(true);
    });
});