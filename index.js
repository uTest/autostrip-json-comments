var installed = false;

function setup() {
  if (installed) { return; }

  var hook = require('./src/hook');
  var strip = require('strip-json-comments');

  hook.hookJsonRequire(function (text, filename) {
    var transformed = strip(text);
    return transformed;
  });
  installed = true;
}

setup();
