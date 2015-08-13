'use strict';

var chai   = require('chai');
var should = chai.should();
var Hapi   = require('hapi');
var domain = require('domain').createDomain();
var q      = require('q');
var server = new Hapi.Server();

function inject(options) {
    var defer = q.defer();

    domain.run(function () {
        server.inject(options, function (response) {
            defer.resolve(response);
        });

    });
    domain.on('error', function (err) {
        defer.reject(err);
        console.log(err.stack);
    });

    return defer.promise;
};

describe('PLUGIN ', function () {

    before(function (done) {
        server.connection({
            port: 5000
        });

        server.register([
            {
                register: require('../'),
                options : {}
            }
        ], function (error) {
            if (error) {
                console.error(error);
                return;
            }
            server.start(done);
        });
    });

    after(function (done) {
        server.stop();
        done();
    });

    it('should respond with a text "hey" on route /plugin/say-hey', function () {
        return inject({
            method: "GET",
            url   : "/plugin/say-hey"
        }).then(function (response) {
            (response.statusCode).should.equal(200);
            (response.result).should.eql({text: 'hey'});
        });
    });

});
