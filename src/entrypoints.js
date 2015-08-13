'use strict';

module.exports = function (server, plugin) {

    server.route({
        method: 'GET',
        path: '/plugin/say-hey',
        handler : plugin.sayHey,
        config : {}
    });

};
