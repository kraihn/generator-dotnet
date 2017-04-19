'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {require: true});
    this.option('directory', {default: 'REPLACE_ME', alias: 'dir', type: String});
  }

  writing() {
    const directoryName = this.options.directory === 'REPLACE_ME' ? this.options.name : this.options.directory;

    this.composeWith(require.resolve('../solution'), {
      directory: directoryName,
      arguments: [this.options.name]
    });
    this.composeWith('dotnet:docker', {
      directory: directoryName,
    });
    this.composeWith('dotnet:webapi', {
      directory: directoryName + '/src'
    });
    this.composeWith('dotnet:classlib', {
      directory: directoryName + '/src',
      arguments: ['Domain']
    });
    this.composeWith('dotnet:classlib', {
      directory: directoryName + '/src',
      arguments: ['IoC']
    });
    this.composeWith('dotnet:xunit', {
      directory: directoryName + '/test',
      arguments: ['UnitTests']
    });
  }
};
