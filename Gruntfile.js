'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('quality', ['nice-package', 'jshint']);
  grunt.registerTask('default', ['quality']);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    readme: {
      options: {
        readme: './docs/README.tpl.md',
        docs: '.'
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        '*.js',
        'src/**/*.js',
        '!src/hook.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
    },

    'nice-package': {
      all: {
        options: {}
      }
    }
  });
};
