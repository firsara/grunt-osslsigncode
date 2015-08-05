/*
 * grunt-osslsigncode
 *
 * Copyright (c) 2015 Fabian Irsara
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    jsonlint: {
      config: {
        src: ['package.json']
      }
    },

    clean: {
      tests: ['tmp', 'bin-out'],
    },

    nodeunit: {
      tests: ['test/test_*.js'],
    },

    watch: {
      jshint: {
        files: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>',
        ],
        tasks: ['jshint']
      },
      jsonlint: {
        files: ['package.json'],
        tasks: ['jsonlint']
      },
      test: {
        files: [
          'tasks/*.js',
          '<%= nodeunit.tests %>',
        ],
        tasks: ['jshint', 'test']
      }
    },

    osslsigncode: {
      msi: {
        options: {
          certificate: 'certificate.pfx',
          certificateOutput: 'tmp/cert_',
          sign: 'bin/app.msi',
          output: 'bin-out/app.signed.msi'
        }
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsonlint');

  grunt.registerTask('test', ['clean', 'osslsigncode', 'nodeunit']);
  grunt.registerTask('default', ['jsonlint', 'jshint', 'test']);

};
