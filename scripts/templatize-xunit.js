const fs = require('fs');

var unitTest = fs.readFileSync('./generators/xunit/templates/UnitTest1.cs', 'utf8');
unitTest = unitTest.replace(/namespace xunit/g, 'namespace <%= namespace %>');
fs.writeFile('./generators/xunit/templates/UnitTest1.cs', unitTest);
