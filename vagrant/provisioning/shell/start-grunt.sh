#!/bin/bash
echo `pwd`
#((/usr/bin/nohup /usr/bin/node /usr/lib/node_modules/grunt-cli/bin/grunt watch >/vagrant/grunt.log )  &)
nohup grunt watch 1>grunt.log  &
echo `ps -ef | grep grunt`
