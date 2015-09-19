'use strict';

/**
 * EntryPoints into the Plugin.
 * These can be URI's or Bus Messages.
 *
 * @param {Object} server - Hapi Server Object
 * @param {Object} plugin - Instance of the Implementation
 */
var entryPoints = function(server, plugin) {
    server.bind(plugin);

    server.route({
        method : 'GET',
        path   : '/plugin/say-hey',
        handler: plugin.sayHey,
        config : {}
    });
};

/**
 * Export the Instance to the World
 */
module.exports = entryPoints;
