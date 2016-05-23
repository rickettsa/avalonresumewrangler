Resume Wrangler Virtual Machine Development Environment
Installation:
  Prerequisites: 
  VirtualBox (Currently running with 5.0.16) (https://www.virtualbox.org/wiki/Downloads)
  Vagrant 1.8.1 (https://www.vagrantup.com/downloads.html)

Download avalonresumewrangler from the beanstalk app git repo: (Beanstalk userid and password required)
git clone https://avalonconsultingllc.git.beanstalkapp.com/avalonresumewrangler.git
cd avalonresumewrangler/vagrant
vagrant up

Add 192.168.33.10 wrangler wrangler.example.com to your /etc/hosts file. TODO: Windows equivalent

First-time installation can take 20+ minutes. 

To stop the virtual machine: 
 (Optional, but safer: Stop elasticsearch first)
   cd path-to-clone-directory/avalonresumewrangler/vagrant 
   vagrant ssh
   sudo service elasticsearch stop
 Stop virtual machine
   (cd path-to-clone-directory/avalonresumewrangler/vagrant)
   vagrant halt
Data will persist. Startup will be much faster on restart.

To restart virtual machine: 
  cd avalonresumewrangler/vagrant 
  vagrant up

To remove the virtual machine completely
  vagrant destroy

To access the application:
http://wrangler.example.com:4567
  The wrangler.example.com is required for the Google Authentication. Just wrangler will work for elasticsearch and the API server

To run API calls to the back end:
http://wrangler.com:5000/...
Test URL: http://wrangler.com:5000/api/users
TODO: postman information

To modify the application:
cd <installation/avalonresumewrangler/vagrant
Go to the appropriate directory - front-end, back-end or data
For the front-end, there is a grunt watch task that will automatically rebuild and reload the front end when a file is modified.
(Back end may require restart)

To access the Elasticsearch cluster:
http://wrangler:9200/...
Test urls: http://wrangler:9200/ gives a quick response
  http://wrangler:9200/_cat/
