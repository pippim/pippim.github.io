---
layout:       post
title:        >
    How do I enable docker as a service without re-installing docker?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1165063
type:         Answer
tags:         software-installation services docker
created_date: 2019-08-12 00:56:36
edit_date:    2019-08-12 11:24:48
votes:        "5 "
favorites:    
views:        "6,142 "
accepted:     Accepted
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-12-How-do-I-enable-docker-as-a-service-without-re-installing-docker_.md
toc:          false
navigation:   false
clipboard:    true
---

## Update Aug 12 2019

For your `systemd` goals, you may want to simply install regular `docker` and not use it via `snap`. From:

- [Why does snap need to wrap systemd?][1]

> We do this for several reasons:  
>   
> -    the fact that systemd is used to launch services is an implementation detail of snapd that we do not want to expose to snap  
> developers. It is entirely possible that another mechanism could be  
> used on different distributions or in the future, and we don’t want  
> snap developers to have to deal with transitions or making the snap  
> only usable on distros with systemd  
> -    snaps can be installed on any number of systems with varying systemd versions. Exposing the unit files directly in the manner you  
> describe could cause problems with snaps using units with newer  
> systemd directives than the systemd on the system supports  
> -    the systemd unit specification is extremely rich and flexible and exposing the entirety of the unit specification would allow snaps to  
> influence the system and other snaps in unpredictable and undesirable  
> ways that are counter to snapd’s design surrounding application  
> isolation, reverts, dependencies, etc, etc  
>   
> Because of the above, we do not plan to wrap the entire systemd unit  
> specification (as you said, that would be unreasonable) and we are  
> exposing a subset of the functionality. Do note that the subset of  
> functionality is being expanded and reevaluated based on feedback from  
> the field (eg, most recently timers and the thread you mentioned 7).  
> Importantly, we want to expose needed functionality to developers in a  
> manner that is consistent with snapd’s design principles and work  
> everywhere in the cross-distribution ecosystem.  

----------

# Systemd setup with "Regular" docker

[Configure docker to start on boot](https://docs.docker.com/install/linux/linux-postinstall//#configure-docker-to-start-on-boot) says:

## Configure Docker to start on boot

Most current Linux distributions (RHEL, CentOS, Fedora, Ubuntu 16.04 and higher) use systemd to manage which services start when the system boots. Ubuntu 14.10 and below use upstart.

### systemd

``` 
$ sudo systemctl enable docker
```

To disable this behavior, use disable instead.

``` 
$ sudo systemctl disable docker
```


----------


Also [Control Docker with systemd](https://docs.docker.com/config/daemon/systemd/) says:

## Control Docker with systemd

Many Linux distributions use systemd to start the Docker daemon. This document shows a few examples of how to customize Docker’s settings.

### Start the Docker daemon

#### Start manually

Once Docker is installed, you need to start the Docker daemon. Most Linux distributions use systemctl to start services. If you do not have systemctl, use the service command.

-    systemctl:

``` 
$ sudo systemctl start docker
```

-    service:

``` 
$ sudo service docker start
```


----------

## Manually create the systemd unit files

When installing the binary without a package, you may want to integrate Docker with systemd. For this, install the two unit files (service and socket) from the [github repository][2] to `/etc/systemd/system`.

### docker.service

{% include copyHeader.html %}
``` 
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target docker.socket firewalld.service
Wants=network-online.target
Requires=docker.socket

[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd -H fd://
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=1048576
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNPROC=infinity
LimitCORE=infinity
# Uncomment TasksMax if your systemd version supports it.
# Only systemd 226 and above support this version.
#TasksMax=infinity
TimeoutStartSec=0
# set delegate yes so that systemd does not reset the cgroups of docker containers
Delegate=yes
# kill only the docker process, not all processes in the cgroup
KillMode=process
# restart the docker process if it exits prematurely
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target
```

### docker.socket

``` 
[Unit]
Description=Docker Socket for the API
PartOf=docker.service

[Socket]
# If /var/run is not implemented as a symlink to /run, you may need to
# specify ListenStream=/var/run/docker.sock instead.
ListenStream=/run/docker.sock
SocketMode=0660
SocketUser=root
SocketGroup=docker

[Install]
WantedBy=sockets.target
```


  [1]: https://forum.snapcraft.io/t/why-does-snap-need-to-wrap-systemd/4507/2
  [2]: https://github.com/moby/moby/tree/master/contrib/init/systemd
