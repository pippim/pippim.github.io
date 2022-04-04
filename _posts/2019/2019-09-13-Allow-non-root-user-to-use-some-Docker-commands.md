---
layout:       post
title:        >
    Allow non-root user to use some Docker commands
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1174045
type:         Answer
tags:         18.04 permissions docker
created_date: 2019-09-13 21:50:40
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "8,952 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-13-Allow-non-root-user-to-use-some-Docker-commands.md
toc:          false
navigation:   false
clipboard:    false
---

From the excellent answer found here:

- [How can I use docker without sudo?](How can I use docker without sudo?)

Good news: the new docker (version 19.03 (currently experimental)) will be able to run rootless negating the problems that can occur using a root user. No more messing with elevated permissions, root and anything that might open up your machine when you did not want to.

Video about this from [[DockerCon 2019] Hardening Docker daemon with Rootless mode][1]

> A few Caveats to the rootless Docker mode  
>  
> Docker engineers say the rootless mode cannot be considered a replacement for the complete suite of Docker engine features. Some limitation to the rootless mode include:  
>  
>- cgroups resource controls, apparmor security profiles, checkpoint/restore, overlay networks etc. do not work on rootless mode.  
>- Exposing ports from containers currently requires manual socat helper process.  
>- Only Ubuntu-based distros support overlay filesystems in rootless mode.  
>- Rootless mode is currently only provided for nightly builds that may not be as stable as you are used to.  




----

As of docker 19.3 this is obsolete (and more dangerous than need be): 

The [docker manual][2] has this to say about it: 

>**Giving non-root access**  
>  
>The docker daemon always runs as the root user, and since Docker version 0.5.2, the docker daemon binds to a Unix socket instead of a TCP port. By default that Unix socket is owned by the user root, and so, by default, you can access it with sudo.  
>  
>Starting in version 0.5.3, if you (or your Docker installer) create a Unix group called docker and add users to it, then the docker daemon will make the ownership of the Unix socket read/writable by the docker group when the daemon starts. The docker daemon must always run as the root user, but if you run the docker client as a user in the docker group then you don't need to add sudo to all the client commands. As of 0.9.0, you can specify that a group other than docker should own the Unix socket with the -G option.  
>  
>    **Warning: The docker group (or the group specified with -G) is root-equivalent; see [Docker Daemon Attack Surface details][3] and this blogpost on [Why we don't let non-root users run Docker in CentOS, Fedora, or RHEL ][4]** (thanks michael-n).  
>  
> In the recent release of the [experimental rootless mode on GitHub][5], engineers mention rootless mode allows running dockerd as an unprivileged user, using user_namespaces(7), mount_namespaces(7), network_namespaces(7).  
>  
> Users need to run dockerd-rootless.sh instead of dockerd.  
>  
>     $ dockerd-rootless.sh --experimental  
>  
> As Rootless mode is experimental, users need to always run dockerd-rootless.sh with –experimental.  


---

Important to read: [post-installation steps for Linux][6] (it also links to [Docker Daemon Attack Surface details][3]).

>**Manage Docker as a non-root user**  
>  
> The docker daemon binds to a Unix socket instead of a TCP port. By default that Unix socket is owned by the user root and other users can only access it using sudo. The docker daemon always runs as the root user.  
>  
> If you don’t want to use sudo when you use the docker command, create a Unix group called docker and add users to it. When the docker daemon starts, it makes the ownership of the Unix socket read/writable by the docker group.  

---

 - Add the docker group if it doesn't already exist:

``` 
    sudo groupadd docker

```
 - Add the connected user "$USER" to the docker group. Change the user name to match your preferred user if you do not want to use your current user:

``` 
    sudo gpasswd -a $USER docker

```
 - Either do a `newgrp docker` or log out/in to activate the changes to groups.

 - You can use 

``` 
    docker run hello-world
```

   to check if you can run docker without sudo.


  [1]: https://www.slideshare.net/AkihiroSuda/dockercon-2019-hardening-docker-daemon-with-rootless-mode
  [2]: https://docs.docker.com/engine/installation/linux/ubuntulinux/#/create-a-docker-group
  [3]: https://docs.docker.com/engine/security/security/#/docker-daemon-attack-surface
  [4]: https://www.projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/
  [5]: https://github.com/moby/moby/blob/master/docs/rootless.md
  [6]: https://docs.docker.com/engine/installation/linux/linux-postinstall/
