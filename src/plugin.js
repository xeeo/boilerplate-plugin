'use strict';

var plugin      = require('./implementation');
var entryPoints = require('./entrypoints');

/**
 * Register the Implementation to act like a Hapi Plugin.
 *
 * @param {Object} server  - Hapi Server Object
 * @param {Object} options - Options passed by the Service
 * @param {Function} next  - Hapi next function
 */
exports.register = function register(server, options, next) {
    var instance = plugin();

    entryPoints(server, instance);
    next();
};

/**
 * Load Package.json.
 *
 * @type {{pkg: *}}
 */
exports.register.attributes = {
    pkg: require('../package.json')
};
