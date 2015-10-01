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
        var stubName = fileName.replace(/\.[^\.]+$/, '');
        var stub     = require(self.subsPath + '/' + stubName);
        
        stub['@global'] = true;
        stubs[stubName] = stub;
    });

    return stubs;
};

module.exports = Stubs;
