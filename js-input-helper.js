#!/usr/bin/env node

// Parse command line options
var path = require('path');
var pkg = require( path.join(__dirname, 'package.json') );
var program = require('commander');
var shelljs = require('shelljs/global');

program
    .version(pkg.version)
    .command('create [project_name]')
    .description( 'Create a new JS-Input Project' )
    .action (function (project_name) {
	if ( ! project_name ) {
		console.error('Project Name required !');
		process.exit(1);
	}
	mkdir('-p', project_name);
	cp('-R',require('path').dirname(require.main.filename)+'/project-template/*',project_name)
	cd(project_name)
	mv('project-template.html',project_name+'.html')
	mv('project-template.xml',project_name+'.xml')
	sed('-i','PROJECT-NAME',project_name,project_name+'.html')
	sed('-i','PROJECT-NAME',project_name,project_name+'.xml')
	sed('-i','PROJECT-NAME',project_name,'README.md')
    });

program.parse(process.argv);

