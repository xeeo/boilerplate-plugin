'use strict';

module.exports = function (server, plugin) {

    server.route({
        method: 'GET',
        path: '/task/say-hey',
        handler : plugin.sayHey,
        config : {}
    });

};
