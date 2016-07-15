'use strict';
var assert = require('chai').assert;
var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('main function ', function () {

    var lookupMock = sinon.stub();
    var initStub;

    var indexSearchMoc


    var sendFileStub;

    var app;
    var useStub = sinon.stub();
    var getStub;
    var postStub;
    var listenStub = sinon.stub();

    var expressStub;
    var sendStub
    var main;

    var req;
    var res;
    var req2;
    var res2;
    
    before(function () {

        mockery.enable({useCleanCache: true});

        req={
            body:{ key :'k1,k2,k3' }
        }
        res = {
            sendfile: sendFileStub = sinon.stub(),
            send: sendStub = sinon.stub()
        };

        req2={
            values:'query to be passed to SOLR '
        }

        res2

        app = {
            use: useStub,
            get: getStub = sinon.stub().callsArgWith(1, null, res),
            post: postStub = sinon.stub(),
            listen: listenStub =sinon.stub().callsArgWith(1)
        };

            postStub.withArgs('/key').callsArgWith(1, req,res),
            postStub.withArgs('/values').callsArgWith(1, req2,res2),

        lookupMock= {init: initStub = sinon.stub()};

        indexSearchMoc = sinon.stub();

        expressStub = sinon.stub().returns(app);


        mockery.registerMock('express', expressStub);
        mockery.registerMock('./lib/lookupApi', lookupMock);
        mockery.registerMock('./lib/indexSearch', indexSearchMoc);

        mockery.registerAllowable('../index');
        main = require('../index');
    });


    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    //========================================== TESTS ==========================================


    it('should make a call to app.get thus successfully sending a HTML file to get input', function () {
        expect(getStub.callCount).to.equal(1)
    });


    it ('should call lookupApi.keys ' , function() {
        expect(initStub.called).to.equal(true);
    });

    it ('should pass keys in a array to lookupApi.keys ' , function() {
        expect(initStub.calledWith(['k1','k2','k3'])).to.equal(true);
    });

    it('should set up a http server listining ' , function (){
        expect(listenStub.callCount).to.equal(1);
    })

    it ('Should call indexSearch ' , function() {
        expect(indexSearchMoc.called).to.equal(true);
    })


});