#!/usr/bin/env bash
cd /vagrant/front-end
if [ `ps -ef |grep grunt |grep -v grep |wc -l` -eq 0 ]
then
echo "Starting grunt watch"
`nohup grunt watch` &
else
echo 'Grunt already running'
fi
if [[ `ps -ef |grep elasticsearch |grep -v grep|wc -l` -eq 0 ]]
then
service elasticsearch start
else 
echo 'elasticsearch already running'
fi

if [ `ps -ef | grep app.py |grep -v grep | wc -l` -eq 0 ]
then
echo 'Starting API server'
sudo su - vagrant -c 'nohup python /vagrant/back-end/api/app/app.py &'
else
echo 'API server already running'
fi
