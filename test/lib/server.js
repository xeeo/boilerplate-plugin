'use strict';

var proxyquire = require('proxyquire').noCallThru();
var Hapi       = require('hapi');
var singleton  = require('nc-singleton');
var server     = new Hapi.Server();
var stubs      = require('./stubs')();
var Promise    = require('bluebird');

var Server = function() {
    return singleton.call(this, Server);
};

Server.prototype.start = function(done) {
    stubs.setSubsPath(__dirname + '/../stubs');

    server.connection({
        port: 5000
    });
    server.register([
        {
            register: proxyquire('../../', stubs.getStubs()),
            options : require('../mocks/options')
        }
    ], function callback(error) {
        if (error) {
            throw Error(error);
        }
        server.start(done);
    });
};

Server.prototype.stop = function(done) {
    server.stop(done);
};

Server.prototype.inject = function(options) {
    return new Promise(function(resolve, reject) {
        try {
            server.inject(options, resolve);
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = Server;
