const fs = require('fs');

var csproj = fs.readFileSync('./generators/webapi/templates/webapi.csproj', 'utf8');
csproj = csproj.substring(0, csproj.lastIndexOf('</ItemGroup>'))
  + '\t<% if (includeSwagger) { %><PackageReference Include="Swashbuckle.AspNetCore" Version="1.0.0" /><% } %>\n\t'
  + csproj.substring(csproj.lastIndexOf('</ItemGroup>'));
fs.writeFile('./generators/webapi/templates/webapi.csproj', csproj);

var program = fs.readFileSync('./generators/webapi/templates/Program.cs', 'utf8');
program = program.replace(/namespace webapi/g, 'namespace <%= namespace %>');
fs.writeFile('./generators/webapi/templates/Program.cs', program);

var startup = fs.readFileSync('./generators/webapi/templates/Startup.cs', 'utf8');
startup = startup.replace(/namespace webapi/g, '<% if (includeSwagger) { %>using Swashbuckle.AspNetCore.Swagger;<% } %>\n\nnamespace <%= namespace %>');
startup = startup.replace(/services.AddMvc\(\);/g, 'services.AddMvc();\n            <% if (includeSwagger) { %>services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new Info { Title = "API", Version = "v1" }); c.DescribeAllEnumsAsStrings(); });<% } %>');
startup = startup.replace(/app.UseMvc\(\);/g, 'app.UseMvc();\n            <% if (includeSwagger) { %>app.UseSwagger();\n            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "API"); });<% } %>');
fs.writeFile('./generators/webapi/templates/Startup.cs', startup);

var valuesController = fs.readFileSync('./generators/webapi/templates/Controllers/ValuesController.cs', 'utf8');
valuesController = valuesController.replace(/namespace webapi/g, 'namespace <%= namespace %>');
fs.writeFile('./generators/webapi/templates/Controllers/ValuesController.cs', valuesController);
