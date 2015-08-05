'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit
  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.osslsigncode = {
  setUp: function(done){
    // setup here if necessary
    done();
  },
  load: function(test){
    test.expect(6);

    var actual = require('../tasks/osslsigncode');
    var expected = 'function';
    test.equal(typeof actual, expected, 'Should export a function');

    test.equal(grunt.file.exists('tmp/cert_output.key'), true, 'tmp/cert_output.key should exist');
    test.equal(grunt.file.exists('tmp/cert_output.spc'), true, 'tmp/cert_output.spc should exist');
    test.equal(grunt.file.exists('tmp/cert_tmp_cert.pem'), true, 'tmp/cert_tmp_cert.pem should exist');
    test.equal(grunt.file.exists('tmp/cert_tmp_key.pem'), true, 'tmp/cert_tmp_key.pem should exist');
    test.equal(grunt.file.exists('bin-out/app.signed.msi'), true, 'bin-out/app.signed.msi should exist');

    test.done();
  }
};
