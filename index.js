var optimist = require('optimist');
var fs = require('fs');
var path = require('path');
var merge = require('deepmerge');

var existsSync = fs.existsSync || path.existsSync;

module.exports = function (configFile, argv) {
    if (Array.isArray(argv)) {
        argv = optimist.parse(argv);
    }
    else if (argv === undefined) {
        argv = optimist.argv;
    }
    delete argv.$0;
    delete argv._;
    
    if (!existsSync(configFile)) {
        return argv;
    }
    else {
        var body = fs.readFileSync(configFile);
        var config = JSON.parse(body);
        return merge(config, argv);
    }
};
