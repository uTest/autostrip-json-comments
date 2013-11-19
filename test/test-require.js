gt.module('strips comments in require', {
  setupOnce: function() {
    require('../index');
    // multiple requires are guarded
    require('../index');
  },
  teardownOnce: function () {
    require('../src/hook').unhookJsonRequire();
    require('../src/hook').unloadJsonCache();
  }
});

gt.test('loading json with comments works', function () {
  var json = require('./commented');
  gt.object(json, 'returns an object');
  gt.ok(json.works, 'loaded commented json');
});

gt.test('loading json without comments is ok', function () {
  var json = require('../package');
  gt.object(json, 'returns an object');
  gt.string(json.name, 'has name');
});
