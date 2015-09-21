'use strict';

var Promise = require('bluebird');

module.exports = {
    say: function() {
        return new Promise(function callback(resolve) {
            resolve('somebody called me to say hey');
        });
    }
};
