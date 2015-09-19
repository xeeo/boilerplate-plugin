'use strict';

var singleton = require('nc-singleton');
var Hoek      = require('hoek');

var defaultOptions = {
    msg: 'hey'
};

var Plugin = function Plugin() {
    this.options = defaultOptions;

    return singleton.call(this, Plugin);
};

Hoek.merge(Plugin.prototype, {
    config: require('./methods/config'),
    sayHey: require('./methods/say-hey')
});

/**
 * Export the Instance to the World
 */
module.exports = Plugin.bind({});
