'use strict';

var plugin = {};

var constructor = function (options) {
    plugin.options = options || {};
    return plugin;
};

plugin.sayHey = function (request, reply) {
    reply({text: 'hey'});
};

module.exports = constructor;
