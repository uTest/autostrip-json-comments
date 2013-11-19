# autostrip-json-comments v0.0.4

> Installs nodejs require hook to strip JSON comments

[![NPM][autostrip-json-comments-icon]][autostrip-json-comments-url]

[![Build status][autostrip-json-comments-ci-image]][autostrip-json-comments-ci-url]
[![dependencies][autostrip-json-comments-dependencies-image]][autostrip-json-comments-dependencies-url]
[![devdependencies][autostrip-json-comments-devdependencies-image]][autostrip-json-comments-devdependencies-url]

[autostrip-json-comments-icon]: https://nodei.co/npm/autostrip-json-comments.png?downloads=true
[autostrip-json-comments-url]: https://npmjs.org/package/autostrip-json-comments
[autostrip-json-comments-ci-image]: https://travis-ci.org/uTest/autostrip-json-comments.png?branch=master
[autostrip-json-comments-ci-url]: https://travis-ci.org/uTest/autostrip-json-comments
[autostrip-json-comments-dependencies-image]: https://david-dm.org/utest/autostrip-json-comments.png
[autostrip-json-comments-dependencies-url]: https://david-dm.org/utest/autostrip-json-comments
[autostrip-json-comments-devdependencies-image]: https://david-dm.org/utest/autostrip-json-comments/dev-status.png
[autostrip-json-comments-devdependencies-url]: https://david-dm.org/utest/autostrip-json-comments#info=devDependencies



install:

```
npm install autostrip-json-comments --save
```

use:

```javascript
require('autostrip-json-comments');

var obj = require('path/to/commented-json-filename');
// comments are automatically stripped inside require
```



## Why?

Because stripping comments from ALL json files should be automatic.

Uses [strip-json-comments](https://github.com/sindresorhus/strip-json-comments) internally.

### Small print

Author: Gleb Bahmutov Copyright &copy; 2013 [uTest](http://www.utest.com/)

* [@utest](https://twitter.com/utest)
* [utest.com](http://utest.com)
* [engineering blog](http://eng.utest.com/)

License: MIT - do anything with the code, but don't blame uTest if it does not work.

Spread the word: tweet, star on github, click *endorse*, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github



## MIT License

Copyright (c) 2013 uTest

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.



## History


0.0.4 / 2013-11-19
==================

  * added travis ci build
  * open sourced the repo!

0.0.3 / 2013-11-19
==================

  * Cleaning up hook file

0.0.2 / 2013-11-19
==================

  * added grunt
  * testing
  * added pre-git


