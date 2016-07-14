'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe(' IndexerFunction - Indexes documents from couchbase into SOLR ', function () {
    var obj = 'INDEXING SUCCESSFUL'


    var solr_cliet_Mock ;
    var createClientStub;

    var client
    var autoCommitStub = sinon.stub();

    var addStub = sinon.stub()
    //addStub.withArgs().callArgWith(1,obj)

    var softCommitStub = sinon.stub();

    var res;
    var sendStub = sinon.stub();
    var sendFileStub = sinon.stub();



    var indexer
    var cbDoc_Array = [
        {doc1: 'body1'},
        {doc2: 'body2'},
    ]

    before(function () {

        solr_cliet_Mock = {
            createClient: createClientStub=sinon.stub().returns(client)
        }

        client = {
            autoCommit: autoCommitStub ,
            add: addStub,
            softCommit: softCommitStub
        }

        res = {
            send: sendStub,
            sendFile: sendFileStub
        }
        mockery.registerAllowable('../lib/solrIndexer')
        mockery.registerMock('solr-client', solr_cliet_Mock)
        indexer = require('../lib/solrIndexer');

    })

    after(function () {
        (mockery.disable)
        mockery.resetCache();
        mockery.deregisterMock('solr_cliet_Mock');
    });

    //========================================== TESTS ==========================================

    it('should call sendFileMock', function () {
        indexer(cbDoc_Array, res);
        expect(sendFileStub.callCount).to.equal(1);
    })

    it('should call client.add', function () {
        indexer(cbDoc_Array, res);
        expect(addStub.callCount).to.equal(1);
    })

    it('should call res.send', function () {
        indexer(cbDoc_Array, res);
        expect(sendStub.callCount).to.equal(1);
    })


    /* it('should call client.autocommit', function () {
         indexer(cbDoc_Array, res);
         expect(autoCommitStub.callCount).to.equal(1);
     })
 */

});