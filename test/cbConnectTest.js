'use strict';

var mockery = require('mockery');
var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('Couchbase Connection', function () {
    var couchbaseMoc;
    var myBucket;
    var clusterStub = sinon.stub();
    var configMock ;

    var openBucketStub = sinon.stub();
    openBucketStub.withArgs('uname','pass').callsArgWith(2,null,'success'); //success
    openBucketStub.withArgs('presentation_assets', 'PassW0rd').callsArgWith(2,null,'success'); //failure


    before('enable mockery', function () {
        mockery.enable({
            useCleanCache: true
        });

        couchbaseMoc = {
            Cluster: clusterStub.returns({
                openBucket: openBucketStub
            })
        }

        configMock={
            gannett:{
                bucket_username:'uname',
                bucket_password: 'pass',
                couchbase_cluster_ip:'10:20:30:40'
            }

        }

        mockery.registerMock('../config/default', configMock);
        mockery.registerAllowable('../lib/cbConnect.js');// so thst warning is not thrown
        mockery.registerMock('couchbase', couchbaseMoc);
        myBucket = require('../lib/cbConnect.js');
    });

    afterEach(function () {
        mockery.resetCache();
        mockery.deregisterMock('couchbase');
    });

    after(function () {
        (mockery.disable)
    });




    it('should call Cluster with the currect IP address', function () {
        assert(clusterStub.calledWith('10:20:30:40'));
    })


    it('should call MYBUCKET', function () {
        assert.equal(openBucketStub.callCount, 1);
    });

    it('should call mybucket with valid login credentials', function () {
        assert(openBucketStub.calledWith('uname', 'pass'));
    })


    it ('should execute the else condition ' , function(){
        expect(openBucketStub).to.return;
    });



});


