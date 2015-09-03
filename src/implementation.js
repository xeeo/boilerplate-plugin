'use strict';

/**
 * Current Instance
 *
 * @type {{}}
 */
var instance = {};

/**
 * Constructor Function.
 *
 * @param {Object} options - Options for overwriting configuration
 *
 * @returns {{}}
 */
var constructor = function constructor(options) {
    instance.options = options || {};

    return instance;
};

/**
 * SayHello Hapi Handler.
 *
 * @param {Object} request - Hapi Request Options
 * @param {Object} reply - Hapi Reply Function
 *
 * no @return
 */
instance.sayHey = function sayHey(request, reply) {
    reply({
        text: 'hey'
    });
};

/**
 * Export the Instance to the World
 */
module.exports = constructor;
