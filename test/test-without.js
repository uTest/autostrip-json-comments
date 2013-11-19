gt.module('without hook');

gt.test('loading json without comments is ok', function () {
  var json = require('../package');
  console.log('json returned is', typeof json);
  console.log(json);
  gt.object(json, 'returns an object');
  gt.string(json.name, 'has name');
});

gt.test('loading commented json raises Exception', function () {
  gt.raises(function () {
    var json = require('./commented.json');
  }, 'Exception');
});
