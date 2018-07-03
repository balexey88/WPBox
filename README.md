# WordPress Vagrant box

### Requiremenets

* Install Virtual Box (>=5.1 version is preferred) <a href="https://www.virtualbox.org/wiki/Downloads" target="_blank">Download</a>

* Install Vagrant (>=2.1 version is preferred) <a href="https://www.vagrantup.com/downloads.html" target="_blank">Download</a>

* Install Vagrant plugins:
``` bash
vagrant plugin install vagrant-hostmanager
vagrant plugin install hostmanager
```

* On Ubuntu to make NFS synchronization work you need to install **nfs-kernel-server** package:
``` bash
apt install nfs-kernel-server
```
---

### Installation

* In the root folder of the project copy configuration file `conf.yml-sample` to `conf.yml`

* Adjust the options in `conf.yml`, at least `box.name` and `box.ip` for domain name and IP address. For the list of all available options refer to `ansible/vars.yml`

* Run
``` bash
vagrant up
```
---
For the list of available tools and options please visit the http://[your box name]/box
