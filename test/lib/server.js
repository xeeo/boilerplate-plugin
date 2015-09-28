'use strict';

var proxyquire = require('proxyquire').noCallThru();
var Hapi       = require('hapi');
var singleton  = require('nc-singleton');
var server     = new Hapi.Server();
var stubs      = require('./stubs')();

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

Server.prototype.inject = function(options, callback) {
    return server.inject(options, callback);
};

module.exports = Server;
