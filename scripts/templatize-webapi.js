const fs = require('fs');

var program = fs.readFileSync('./generators/webapi/templates/Program.cs', 'utf8');
program = program.replace(/namespace webapi/g, 'namespace <%= namespace %>');
fs.writeFile('./generators/webapi/templates/Program.cs', program);

var startup = fs.readFileSync('./generators/webapi/templates/Startup.cs', 'utf8');
startup = startup.replace(/namespace webapi/g, 'namespace <%= namespace %>');
fs.writeFile('./generators/webapi/templates/Startup.cs', startup);

var valuesController = fs.readFileSync('./generators/webapi/templates/Controllers/ValuesController.cs', 'utf8');
valuesController = valuesController.replace(/namespace webapi/g, 'namespace <%= namespace %>');
fs.writeFile('./generators/webapi/templates/Controllers/ValuesController.cs', valuesController);
