'use strict';

var assert= require('chai').assert;
var expect = require('chai').expect;

var mockery= require('mockery');
var sinon=require('sinon');


describe('main function ' , function (){

    var appStub=sinon.stub();
    var getStub=sinon.stub();
    var postStub=sinon.stub();
    var postStub=sinon.stub();
    var resStub=sinon.stub();
    var resStub=sinon.stub();
    var main;
    getStub.withArgs('/').callsArgWith(1,'req',resStub);

    before(function(){
        mockery.enable({
            useCleanCache: true
        });

        appStub={
            get:getStub,
            post:postStub,
            listen:listenStub
        }

        resStub={
           send:sendStub

        }
        mockery.registerAllowable('../index');
        mockery.registerMock('express',appStub);
        main= require('../index');


    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('does nothing',  function(){

    });

});