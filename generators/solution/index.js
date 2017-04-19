'use strict';
const Generator = require('yeoman-generator');
const vsproj = require('vs_projectname');
const uuid = require('uuid');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {require: true});
    this.argument('projects', {default: [], require: false, type: Array});
    this.option('directory', {default: '.', alias: 'dir', type: String});
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('solution.sln'),
      this.destinationPath([this.options.directory, vsproj(this.options.name) + '.sln'].join('/')),
      {
        projects: this.options.projects.map(function (project) {
          return {
            name: project.split(':')[0],
            path: project.split(':')[1],
            buildId: uuid.v1().toUpperCase()
          };
        }),
        solutionId: '9A19103F-16F7-4668-BE54-9A1E7A4F7556'
      }
    );
  }
};
