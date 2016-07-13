'use strict';

var assert= require('chai').assert;
var expect = require('chai').expect;

var assert= require('mockery');
var sinon=require('sinon');


describe('main function ' , function (){

    var appStub=sinon.stub();
    var getStub=sinon.stub();
    var postStub=sinon.stub();
    var postStub=sinon.stub();
    
    before(function(){

        mockery.enable({
            useCleanCache: true
        });

        appStub={
            get:getStub;
            post:postStub;
            listen:listenStub;
        }



    });

    after(function () {
        mockery.deregisterAll();
        mockery.disable();
    });


});