// based on https://github.com/gotwarlost/istanbul/blob/master/lib/hook.js

/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var extension = '.json';

var fs = require('fs'),
Module = require('module'),
originalLoader = Module._extensions[extension];

function unloadJsonCache() {
  function isJsonFile(filename) {
    return (/\.json$/).test(filename);
  }

  if (typeof require !== 'undefined' && require && require.cache) {
    Object.keys(require.cache).forEach(function (filename) {
      if (isJsonFile(filename)) {
        delete require.cache[filename];
      }
    });
  }
}

function hookJsonRequire(transformer) {
  Module._extensions['.json'] = function (module, filename) {
    var ret = transformer(fs.readFileSync(filename, 'utf8'), filename);
    var str = 'module.exports = ' + ret;
    module._compile(str, filename);
  };
}

function unhookJsonRequire() {
  Module._extensions['.json'] = originalLoader;
}

module.exports = {
  hookJsonRequire: hookJsonRequire,
  unhookJsonRequire: unhookJsonRequire,
  unloadJsonCache: unloadJsonCache
};

