'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('directory', {default: 'src', alias: 'dir', type: String});
  }

  writing() {
    this.fs.copy(
      this.templatePath('.dockerignore'),
      this.destinationPath([this.options.directory, '.dockerignore'].join('/'))
    );
    this.fs.copy(
      this.templatePath('Dockerfile'),
      this.destinationPath([this.options.directory, 'Dockerfile'].join('/'))
    );
  }
};
