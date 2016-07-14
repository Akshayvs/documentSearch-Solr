'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe(' Index search ', function () {

    var indexSearch;
    var solrStub;
    var clientStub;

    var resStub = sinon.stub();
    var sendStub = sinon.stub();
    var createClient


    var obj = {
        key: 'actual document retreived  from the index'
    }

    var getStub = sinon.stub();
    getStub.withArgs('select', 'q:*:*&fq: ......').callsArgWith(2, null, obj);
    getStub.withArgs('select', undefined).callsArgWith(2, Error);

    var autocommit

    var query = {
        a: 'b',
        values: 'q:*:*&fq: ......'
    };

    before(function () {

        clientStub = {
            autoCommit: autocommit,
            get: getStub,
        }

        solrStub = {
            createClient: createClient = sinon.stub().returns(clientStub)
        }
        resStub = {
            send: sendStub
        }


        mockery.enable({
            useCleanCache: true
        });

        mockery.registerMock('solr-client', solrStub);
        indexSearch = require('../lib/indexSearch');
    });

    after(function () {
        (mockery.disable)
        mockery.resetCache();
        mockery.deregisterMock('solr-client');
    });


    //========================================== TESTS ==========================================


    it('should senda response', function () {
        indexSearch(query, resStub)
        expect(sendStub.callCount).to.equal(1);

    });

    it('should throw an error if query passed is empty', function () {
        var emptyQuery = {}
        indexSearch(emptyQuery, resStub)
        expect(sendStub.calledWith(404)).to.equal(true);
    });

})

