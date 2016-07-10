/*
 * grunt-osslsigncode
 * https://github.com/firsara/grunt-osslsigncode
 *
 * Copyright (c) 2015 Fabian Irsara
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt){
  var exec = require('child_process').exec;
  var path = require('path');
  var fs = require('fs');

  var executeCommandList = function(list, callback){
    var index = -1;

    var executeSubCommand = function(){
      index++;

      var cmd = list[index];

      if (cmd) {
        executeCommand(cmd, executeSubCommand);
      } else {
        if (callback) {
          callback();
        }
      }
    };

    executeSubCommand();
  };

  var executeCommand = function(cmd, callback){
    exec(cmd, function(error, stdout, stderr){
      if (stdout && stdout.toString().length > 0) {
        console.log(stdout);
      }

      if (stderr && stderr.toString().length > 0) {
        console.log(stderr);
      }

      if (error !== null) {
        console.log(error);
      } else {
        if (callback) {
          callback();
        }
      }
    });
  };

  var generateCertificate = function(options, callback){
    var source = options.certificate;
    var target = options.certificateOutput;
    if (! (grunt.file.exists(target + 'output.key') && grunt.file.exists(target + 'output.spc'))) {
      var directory = path.dirname(target);
      if (directory !== '.') {
        grunt.file.mkdir(directory);
      }

      var commands = [];

      var password = (options.password) ? ' -password pass:' + options.password : '';

      commands.push(
        'openssl pkcs12' +
        ' -in ' + source + ' -nocerts -nodes' +
        ' -out ' + target + 'tmp_key.pem' + password
      );

      commands.push(
        'openssl pkcs12' +
        ' -in ' + source + ' -nokeys -nodes' +
        ' -out ' + target + 'tmp_cert.pem' + password
      );

      commands.push(
        'openssl rsa' +
        ' -in ' + target + 'tmp_key.pem -outform DER' +
        ' -out ' + target + 'output.key'
      );

      commands.push(
        'openssl crl2pkcs7' +
        ' -nocrl -certfile ' + target + 'tmp_cert.pem -outform DER' +
        ' -out ' + target + 'output.spc'
      );

      executeCommandList(commands, callback);
    } else {
      if (callback) {
        callback();
      }
    }
  };

  grunt.registerMultiTask('osslsigncode', 'Codesign Application with osslsigncode utility based on a .pfx or .p12 certificate', function(){
    var done = this.async();

    var options = this.options({
      certificate: 'certificate.pfx',
      certificateOutput: 'tmp/certificate_',
      sign: null,
      output: null,
      password: null,
      timestamp: 'http://timestamp.verisign.com/scripts/timstamp.dll',
      name: null,
      url: null
    });

    if (! options.sign) {
      throw new Error('option "sign" not set. specify a target file that should be signed (*.exe, *.msi, ...)');
    }

    generateCertificate(options, function(){
      var commands = [];

      var out = options.output ? options.output : options.sign + '.out';

      var directory = path.dirname(out);
      if (directory !== '.') {
        grunt.file.mkdir(directory);
      }

      commands.push(
        'osslsigncode' +
        ' -spc ' + options.certificateOutput + 'output.spc' +
        ' -key ' + options.certificateOutput + 'output.key' +
        ' -t ' + options.timestamp +
        ' -in ' + options.sign +
        ' -out ' + out +
        (options.password ? ' -pass ' + options.password : '') +
        (options.name ? ' -n \"' + options.name + '\"' : '') +
        (options.url ? ' -i \"' + options.url + '\"' : '')
      );

      executeCommandList(commands, function(){
        // if no output path was specified
        if (! options.output) {
          // overwrite with old executable
          fs.unlinkSync(options.sign);
          fs.renameSync(out, options.sign);
        }

        done();
      });
    });
  });
};
