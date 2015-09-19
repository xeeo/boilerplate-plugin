'use strict';

var singleton = require('nc-singleton');
var fs        = require('fs');

var Stubs = function() {
    return singleton.call(this, Stubs);
};

Stubs.prototype.setSubsPath = function(path) {
    this.subsPath = path;
};

Stubs.prototype.getStubs = function(path) {
    var stubFiles;
    var stubs = {};
    var self  = this;

    if (path) {
        this.setSubsPath(path);
    }

    stubFiles = fs.readdirSync(this.subsPath);

    stubFiles.forEach(function callback(fileName) {
        var stub = fileName.replace(/\.[^\.]+$/, '');

        stubs[stub] = require(self.subsPath + '/' + stub);
    });

    return stubs;
};

module.exports = Stubs;
