'use strict';
const Generator = require('yeoman-generator');
const vsproj = require('vs_projectname');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', {default: 'WebApi', require: false});
    this.option('directory', {default: 'src', alias: 'dir', type: String});
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('Controllers/BaseController.cs'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), 'Controllers', 'BaseController.cs'].join('/')),
      {namespace: vsproj(this.options.name)}
    );
    this.fs.copyTpl(
      this.templatePath('Controllers/ValuesController.cs'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), 'Controllers', 'ValuesController.cs'].join('/')),
      {namespace: vsproj(this.options.name)}
    );

    mkdirp([this.options.directory, vsproj(this.options.name), 'wwwroot'].join('/'));

    this.fs.copy(
      this.templatePath('appsettings.Development.json'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), 'appsettings.Development.json'].join('/'))
    );
    this.fs.copy(
      this.templatePath('appsettings.json'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), 'appsettings.json'].join('/'))
    );

    this.fs.copyTpl(
      this.templatePath('Program.cs'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), 'Program.cs'].join('/')),
      {namespace: vsproj(this.options.name)}
    );
    this.fs.copyTpl(
      this.templatePath('Startup.cs'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), 'Startup.cs'].join('/')),
      {namespace: vsproj(this.options.name)}
    );

    this.fs.copy(
      this.templatePath('webapi.csproj'),
      this.destinationPath([this.options.directory, vsproj(this.options.name), vsproj(this.options.name) + '.csproj'].join('/'))
    );
  }
};
