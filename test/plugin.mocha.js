/*jshint -W030 */
'use strict';

var server = require('./lib/server')();
require('./lib/chai');

describe('INSTANCE ', function() {
    before(function(done) {
        server.start(done);
    });

    after(function(done) {
        server.stop(done);
    });

    it('should respond with a text "hey" on route /plugin/say-hey', function(done) {
        server.inject({
            method: 'GET',
            url   : '/plugin/say-hey'
        }, function callback(response) {
            (response.statusCode).should.equal(200);
            (response.result).should.have.property('text').which.equals('hey');
            (response.result).should.have.property('event');

            done();
        });
    });
});
