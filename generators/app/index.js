'use strict';
const Generator = require('yeoman-generator');

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
      arguments: [
        this.options.name,
        'WebApi:src\\WebApi\\WebApi.csproj',
        'Models:src\\Models\\Models.csproj',
        'Services:src\\Services\\Services.csproj',
        'IoC:src\\IoC\\IoC.csproj',
        'UnitTests:test\\UnitTests\\UnitTests.csproj']
    });
    this.composeWith('dotnet:docker', {
      directory: directoryName
    });
    this.composeWith('dotnet:webapi', {
      directory: directoryName + '/src'
    });
    this.composeWith('dotnet:classlib', {
      directory: directoryName + '/src',
      arguments: ['Models']
    });
    this.composeWith('dotnet:classlib', {
      directory: directoryName + '/src',
      arguments: ['Services']
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
