'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe(' IndexerFunction - Indexes documents from couchbase into SOLR ', function () {
    var obj = 'INDEXING SUCCESSFUL'


    var solr_cliet_Mock;
    var createClientStub;

    var client
    var autoCommitStub = sinon.stub();

    var addStub
    //addStub.withArgs().callArgWith(1,obj)

    var softCommitStub = sinon.stub();

    var res;
    var sendStub = sinon.stub();
    var sendFileStub = sinon.stub();


    var indexer
    var cbDoc_Array = [
        {doc1: 'body1'},
        {doc2: 'body2'},
        {doc3: 'body3'}
    ]

    before(function () {

        mockery.enable({
            useCleanCache: true
        });

        client = {
            autoCommit: autoCommitStub,
            add: addStub = sinon.stub(),
            softCommit: softCommitStub
        }
        addStub.withArgs({doc1: 'body1'}).callsArgWith(1, null, 'SUCCESS');
        addStub.withArgs({err: 'or'}).callsArgWith(1,Error);

        solr_cliet_Mock = {
            createClient: createClientStub = sinon.stub().returns(client)
        }


        res = {
            send: sendStub,
            sendFile: sendFileStub
        }
        mockery.registerAllowable('../lib/solrIndexer')
        mockery.registerMock('solr-client', solr_cliet_Mock)
        indexer = require('../lib/solrIndexer');

    })

    afterEach(function () {
        mockery.resetCache();
    });

    after(function () {
        (mockery.disable)
        mockery.resetCache();
        mockery.deregisterMock('solr_cliet_Mock');
    });

    //========================================== TESTS ==========================================

    it('should send a response after parsing the entire array', function () {
        indexer(cbDoc_Array, res);
        expect(sendFileStub.callCount).to.equal(1);
    })


    it('should call call.softcommit if docs are indexed ', function () {
        indexer(cbDoc_Array, res);
        expect(softCommitStub.called).to.equal(true);

    });

    it('should res.send the error  if client.add sends an error', function () {
        var error_Array = [{err: 'or'}, {err: 'or'}]
        indexer(error_Array, res);
        expect(sendStub.called).to.equal(true);
    })


});