gt.module('strips comments in require');

// installs hook
require('../index');

gt.test('loading json with comments', function () {
  var json = require('./commented');
  console.log('json returned is', typeof json);
  console.log(json);
  gt.object(json, 'returns an object');
  gt.ok(json.works, 'loaded commented json');
});
