'use strict';
const Generator = require('yeoman-generator');
const vsproj = require('vs_projectname');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {require: true});
    this.option('directory', {default: 'src', alias: 'dir', type: String});
  }

  writing() {
    this.fs.copy(
      this.templatePath('classlib.csproj'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), vsproj(this.options.name) + '.csproj'].join('/'))
    );
  }
};
