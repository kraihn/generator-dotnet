'use strict';
const Generator = require('yeoman-generator');
const vsproj = require('vs_projectname');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {require: true});
    this.option('directory', {default: 'test', alias: 'dir', type: String});
  }

  writing() {
    this.fs.copy(
      this.templatePath('xunit.csproj'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), vsproj(this.options.name) + '.csproj'].join('/'))
    );
    this.fs.copyTpl(
      this.templatePath('UnitTest1.cs'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), 'UnitTest1.cs'].join('/')),
      {namespace: vsproj(this.options.name)}
    );
  }
};
