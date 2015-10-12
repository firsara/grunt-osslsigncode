# grunt-osslsigncode

> Codesign Application with osslsigncode utility based on a .pfx or .p12 certificate




## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-osslsigncode --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks( 'grunt-osslsigncode' );
```

This plugin also requires you to have openssl and osslsigncode installed on your machine. You can install it with this command:

#### Mac OSX

```shell
brew install openssl
brew install osslsigncode
```

#### Linux

```shell
sudo apt-get install openssl
sudo apt-get install osslsigncode
```

## The "osslsigncode" task

### Overview
This module helps signing applications with a .pfx or .p12 certificate based on the osslsigncode utility.

When first running the task you should be prompted to enter the password for your certificate.
The plugin generates a .key and .spc file to a temporary directory that should be excluded from version control.
When running again it detects that the files have already been generated and won't ask you for a password for future releases.

### Configuration
Setup the `osslsigncode` task like so:


```js
grunt.initConfig( {
	osslsigncode: {
		your_target: {
			options: {
				// Task-specific options go here.
				certificate: 'path/to/certificate.pfx', // path to your .pfx or .p12 certificate
				certificateOutput: 'path/to/tmp/output_', // prefix to a temporary output directory for generated certificates
				sign: 'path/to/app.exe', // path to your executable that should be signed
				output: 'path/to/signed.app.exe', // (optional) path to your signed exe
				password: 'your_password', // (optional) certificate password
				timestamp: 'http://timestamp.globalsign.com/scripts/timestamp.dll', // (optional) url where timestamp should be fetched from
				name: 'App Name', // (optional) your app's name
				url: 'http://www.example.com' // (optional) author's url of app
			}
		},
	},
} )
```

### Options

#### options.certificate
Type: `String`
Default value: `"certificate.pfx`

A string value that determines the location of the certificate file that is used to sign the application.

#### options.certificateOutput
Type: `String`
Default value: `"tmp/certificate_"`

A string that defines a temporary output directory for generated .key and .spc files. Highly recommended to exclude those files from version control.

For example:

```js
options: {
	certificateOutput: 'store/gen_'
}
```

Generates the following files:

```
store/gen_output.key
store/gen_output.spc
store/gen_tmp_cert.pem
store/gen_tmp_key.pem
```

#### options.sign
Type: `String`
Default value: `null`
Required

A string that defines the path to the application's executable that should be signed. (.exe, .msi, etc.)
Task will throw an error if the option is not set.

#### options.output
Type: `String`
Default value: `null`
Optional

An optional string that defines the output of the signed executable file. If not set overwrites the original executable file defined in `options.sign`.

#### options.password
Type: `String`
Default value: `null`
Optional

An optional string that defines the password stored inside the certificate. If defined no password prompt is shown while generating .key and .spc files.

#### options.timestamp
Type: `String`
Default value: `"http://timestamp.verisign.com/scripts/timstamp.dll"`
Optional

An optional string that defines the a url where the timestamp for signing the application should be fetched from.

#### options.name
Type: `String`
Default value: `null`
Optional

An optional string that defines the app's name.

#### options.url
Type: `String`
Default value: `null`
Optional

An optional string that defines the author's url of the app.

## License
Copyright (c) 2015 Fabian Irsara (<a href="http://fabianirsara.com">http://fabianirsara.com</a>). Licensed under the MIT license.