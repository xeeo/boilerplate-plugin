'use strict';

var testModule = require('test-module');

module.exports = function(request, reply) {
    var self = this;

    testModule.say().then(function success(result) {
        reply({
            text : self.options.msg,
            event: result
        });
    });
};
