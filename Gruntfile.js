/*
 * grunt-osslsigncode
 *
 * Copyright (c) 2015 Fabian Irsara
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

  var jsFiles = [
    'Gruntfile.js',
    'tasks/*.js',
    '<%= nodeunit.tests %>'
  ];

  grunt.initConfig({
    jshint: {
      all: jsFiles,
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      src: jsFiles
    },

    jsonlint: {
      config: {
        src: ['package.json']
      }
    },

    clean: {
      tests: ['tmp', 'bin-out']
    },

    nodeunit: {
      tests: ['test/test_*.js']
    },

    watch: {
      jshint: {
        files: jsFiles,
        tasks: ['jshint', 'jscs']
      },
      jsonlint: {
        files: ['package.json'],
        tasks: ['jsonlint']
      },
      test: {
        files: [
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ],
        tasks: ['test']
      }
    },

    osslsigncode: {
      msi: {
        options: {
          certificate: 'certificate.pfx',
          password: 'your_password',
          certificateOutput: 'tmp/cert_',
          sign: 'bin/app.msi',
          output: 'bin-out/app.signed.msi',
          timestamp: 'http://timestamp.globalsign.com/scripts/timestamp.dll',
          name: 'App Name',
          url: 'http://www.example.com'
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('test', ['clean', 'osslsigncode', 'nodeunit']);
  grunt.registerTask('default', ['jsonlint', 'jshint', 'jscs', 'test']);

};
