'use strict';
var assert = require('chai').assert;
var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe('main function ', function () {
    var res;
    var sendFileStub;

    var app;
    var useStub = sinon.stub();
    var getStub;
    var postStub = sinon.stub();
    var listenStub = sinon.stub();

    var expressStub;
    var sendStub
    var main;

    before(function () {
        mockery.enable({
            useCleanCache: true
        });

        res = {
            sendfile: sendFileStub = sinon.stub(),
            send: sendStub = sinon.stub()
        };

        app = {
            use: useStub,
            get: getStub = sinon.stub().callsArgWith(1, null, res),
            post: postStub,
            listen: listenStub
        };
        expressStub = sinon.stub().returns(app);

        mockery.registerAllowable('../index');
        mockery.registerMock('express', expressStub);
        main = require('../index');
    });


    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    //========================================== TESTS ==========================================


    it('should make a call to app.get', function () {
        expect(getStub.callCount).to.equal(1)

    });


    it('should make a call to app.post', function () {
        expect(postStub.callCount).to.equal(1)

    });


});