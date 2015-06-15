#!/usr/bin/env bash

echo "=============================="

echo "Staring $0"
#Create cert for apache role
#https://galaxy.ansible.com/list#/roles/428
#openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout apache.key -out apache.crt

echo "Starting Angular Copy Action.."

WRDIR=/var/www/vhosts/resumeWrangler

mkdir -p $WRDIR

cp -r /vagrant/siteCopyTemp/* $WRDIR

echo "=============================="

exit 0;
