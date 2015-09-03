'use strict';

var Hapi   = require('hapi');
var domain = require('domain').createDomain();
var q      = require('q');
var server = new Hapi.Server();

var urlInject = function urlInject(options) {
    var defer = q.defer();

    domain.run(function runMock() {
        server.inject(options, function callback(response) {
            defer.resolve(response);
        });
    });
    domain.on('error', function callback(err) {
        defer.reject(err);
        console.log(err.stack);
    });

    return defer.promise;
};

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
        return urlInject({
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
