// based on https://github.com/gotwarlost/istanbul/blob/master/lib/hook.js

/*
 Copyright (c) 2012, Yahoo! Inc.  All rights reserved.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

/**
 * provides a mechanism to transform code in the scope of `require` or `vm.createScript`.
 * This mechanism is general and relies on a user-supplied `matcher` function that determines when transformations should be
 * performed and a user-supplied `transformer` function that performs the actual transform.
 * Instrumenting code for coverage is one specific example of useful hooking.
 *
 * Note that both the `matcher` and `transformer` must execute synchronously.
 *
 * For the common case of matching filesystem paths based on inclusion/ exclusion patterns, use the `matcherFor`
 * function in the istanbul API to get a matcher.
 *
 * It is up to the transformer to perform processing with side-effects, such as caching, storing the original
 * source code to disk in case of dynamically generated scripts etc. The `Store` class can help you with this.
 *
 * Usage
 * -----
 *
 *      var hook = require('this filename').hook,
 *          myMatcher = function (file) { return file.match(/foo/); },
 *          myTransformer = function (code, file) { return 'console.log("' + file + '");' + code; };
 *
 *      hook.hookRequire(myMatcher, myTransformer);
 *
 *      var foo = require('foo'); //will now print foo's module path to console
 *
 * @class Hook
 */
var extension = '.json';

var path = require('path'),
    fs = require('fs'),
    Module = require('module'),
    vm = require('vm'),
    originalLoader = Module._extensions[extension],
    originalCreateScript = vm.createScript,
    originalRunInThisContext = vm.runInThisContext;

/*
function transformFn(matcher, transformer, verbose) {

    return function (code, filename) {
        var shouldHook = matcher(path.resolve(filename)),
            transformed,
            changed = false;

        if (shouldHook) {
            if (verbose) {
                console.error('Module load hook: transform [' + filename + ']');
            }
            try {
                transformed = transformer(code, filename);
                changed = true;
            } catch (ex) {
                console.error('Transformation error; return original code');
                console.error(ex);
                transformed = code;
            }
        } else {
            transformed = code;
        }
        return { code: transformed, changed: changed };
    };
}
*/

function unloadJsonCache() {
    function matcher(filename) {
        return /\.json$/.test(filename);
    }

    if (matcher && typeof require !== 'undefined' && require && require.cache) {
        Object.keys(require.cache).forEach(function (filename) {
            if (matcher(filename)) {
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
/**
 * hooks `vm.createScript` to return transformed code out of which a `Script` object will be created.
 * Exceptions in the transform result in the original code being used instead.
 * @method hookCreateScript
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.createScript`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the filename passed to
 *  `vm.createScript`. Should return the transformed code.
 * @param options {Object} options Optional.
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 */
function hookCreateScript(matcher, transformer, opts) {
    opts = opts || {};
    var fn = transformFn(matcher, transformer, opts.verbose);
    vm.createScript = function (code, file) {
        var ret = fn(code, file);
        return originalCreateScript(ret.code, file);
    };
}

/**
 * unhooks vm.createScript, restoring it to its original state.
 * @method unhookCreateScript
 * @static
 */
function unhookCreateScript() {
    vm.createScript = originalCreateScript;
}


/**
 * hooks `vm.runInThisContext` to return transformed code.
 * @method hookRunInThisContext
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.createScript`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the filename passed to
 *  `vm.createScript`. Should return the transformed code.
 * @param options {Object} options Optional.
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 */
function hookRunInThisContext(matcher, transformer, opts) {
    opts = opts || {};
    var fn = transformFn(matcher, transformer, opts.verbose);
    vm.runInThisContext = function (code, file) {
        var ret = fn(code, file);
        return originalRunInThisContext(ret.code, file);
    };
}

/**
 * unhooks vm.runInThisContext, restoring it to its original state.
 * @method unhookRunInThisContext
 * @static
 */
function unhookRunInThisContext() {
    vm.runInThisContext = originalRunInThisContext;
}


module.exports = {
    hookJsonRequire: hookJsonRequire,
    unhookJsonRequire: unhookJsonRequire,
    /*,
    hookCreateScript: hookCreateScript,
    unhookCreateScript: unhookCreateScript,
    hookRunInThisContext : hookRunInThisContext,
    unhookRunInThisContext : unhookRunInThisContext,*/
    unloadJsonCache: unloadJsonCache
};

