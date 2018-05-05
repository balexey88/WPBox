# Author: Alexey Bolgunovsky
# Company: CodeTiburon
# Date: 2016-10-04

# -*- mode: ruby -*-
# vi: set ft=ruby :

#
# Read config Constants
#

require 'yaml'

settings_file       = File.join( __dir__, 'conf.yml')

if !File.exist?(settings_file)
    puts '* Config file missing'
    puts '* Please copy conf.yml-sample to conf.yml and configure your box'
    exit
end

settings            = YAML.load_file( settings_file )

settings_file       = File.join( __dir__, 'ansible/vars.yml')
settings            += YAML.load_file( settings_file )

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
    # The most common configuration options are documented and commented below.
    # For a complete reference, please see the online documentation at
    # https://docs.vagrantup.com.

    # Every Vagrant development environment requires a box. You can search for
    # boxes at https://atlas.hashicorp.com/search.
    config.vm.box           = 'bento/ubuntu-16.04'
    config.vm.hostname      = settings['site']['host']
    config.vm.network :private_network, :ip => settings['site']['ip']

    # Setup directories synchronization mode
    if Vagrant::Util::Platform.windows?
        sync_options = {
            :mount_options      => ['dmode=775', 'fmode=775'],
            :owner              => 'vagrant',
            :group              => 'vagrant'
        }
    else
        if settings['box']['sync'] == 'rsync'
            sync_options = {
                :type               => 'rsync',
                :mount_options      => ['dmode=775', 'fmode=775'],
                :owner              => 'vagrant',
                :group              => 'vagrant',
                :rsync__args        => ['--verbose', '--archive', '-z'],
                :rsync__exclude     => ['.git/', '.vagrant/'],
                :rsync__auto        => true
            }
        else
            sync_options = {
                :nfs => { :mount_options => ['dmode=775', 'fmode=775', 'rw', 'vers=3', 'tcp', 'fsc', 'actimeo=2'] }
            }
        end
    end

    config.vm.synced_folder '.', '/vagrant', sync_options

    # update "host" file for host machine also
    if Vagrant.has_plugin? 'vagrant-hostmanager'
        config.hostmanager.manage_host              = true
        config.hostmanager.enabled                  = true
        config.hostmanager.ignore_private_ip        = false
        config.hostmanager.include_offline          = true

        if !settings['hostmanager-aliases'].nil?
            config.hostmanager.aliases              = settings['hostmanager-aliases']
        end
    end

    # Configure VirtualBox provider
    config.vm.provider :virtualbox do |vb|
        host = RbConfig::CONFIG['host_os']

        # Give VM access to all cpu cores on the host
        if host =~ /darwin/
            cpus = `sysctl -n hw.ncpu`.to_i
        elsif host =~ /linux/
            cpus = `nproc`.to_i
        else # sorry Windows folks, I can't help you
            cpus = settings['box']['cpus']
        end

        vb.name = settings['site']['host']
        vb.customize [ 'modifyvm', :id, '--cpus', cpus ]
        vb.customize [ 'modifyvm', :id, '--memory', settings['box']['memsize'] ]
        vb.customize [ 'modifyvm', :id, '--natdnshostresolver1', 'on']
        vb.customize [ 'modifyvm', :id, '--natdnsproxy1', 'on' ]
    end

    # Run Host Manager provision
    config.vm.provision :hostmanager

    # Run ansible local
    config.vm.provision 'ansible_local' do |ansible|
        if !settings['verbose'].nil?
            ansible.verbose = settings['verbose']
        end

        ansible.playbook    = 'ansible/playbook.yml'
    end

    # Apache could fail to start because /vagrant folder is not mounted yet
    config.vm.provision "fix-no-tty", type: "shell" do |s|
        s.privileged    = false
        s.inline        = "sudo sed -i '/tty/!s/mesg n/tty -s \\&\\& mesg n/' /root/.profile"
    end

    config.vm.provision "shell", inline: "service apache2 restart", run: "always", privileged: "false"

    config.vm.post_up_message = "Vagrant Box up and running!" +
        "See more information and tools available at http://" + settings['site']['host'] + "/info"
end
