'use strict';
const Generator = require('yeoman-generator');
const vsproj = require('vs_projectname');
const uuid = require('uuid');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {require: true});
    this.option('directory', {default: '.', alias: 'dir', type: String});
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('solution.sln'),
      this.destinationPath([this.options.directory, vsproj(this.options.name) + '.sln'].join('/')),
      {
        projects: [
          {
            name: 'WebApi',
            path: 'src\\WebApi\\WebApi.csproj',
            uuid: uuid.v4().toUpperCase(),
            buildId: uuid.v4().toUpperCase()
          }
        ]
      }
    );
  }
};
