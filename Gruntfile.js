'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('quality', ['nice-package', 'jshint', 'readme']);
  grunt.registerTask('default', ['quality']);

  grunt.initConfig({
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
        'src/**/*.js'
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
