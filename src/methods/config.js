'use strict';

var Hoek = require('hoek');

module.exports = function(options) {
    this.options = Hoek.applyToDefaults(this.options, options);
};
