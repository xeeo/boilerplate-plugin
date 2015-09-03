'use strict';

var Hapi    = require('hapi');
var domain  = require('domain').createDomain();
var Promise = require('bluebird');
var chai    = require('chai');
var server  = new Hapi.Server();

var httpInject = function httpInject(options) {
    return new Promise(function promise(resolve, reject) {
        domain.run(function runMock() {
            server.inject(options, function callback(response) {
                resolve(response);
            });
        });
        domain.on('error', function callback(err) {
            reject(err);
            console.log(err.stack);
        });
    });
};

chai.should();

describe('INSTANCE ', function() {
    before(function(done) {
        server.connection({
            port: 5000
        });

        server.register([
            {
                register: require('../'),
                options : {}
            }
        ], function callback(error) {
            if (error) {
                console.error(error);

                return;
            }
            server.start(done);
        });
    });

    after(function(done) {
        server.stop();
        done();
    });

    it('should respond with a text "hey" on route /plugin/say-hey', function() {
        return httpInject({
            method: 'GET',
            url   : '/plugin/say-hey'
        }).then(function success(response) {
            (response.statusCode).should.equal(200);
            (response.result).should.eql({
                text: 'hey'
            });
        });
    });
});
