const fs = require('fs');

var classFile = fs.readFileSync('./generators/classlib/templates/Class1.cs', 'utf8');
classFile = classFile.replace(/namespace classlib/g, 'namespace <%= namespace %>');
fs.writeFile('./generators/classlib/templates/Class1.cs', classFile);
