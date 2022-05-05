---
layout:       post
title:        >
    How can I install `mpich` library?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1010469
type:         Answer
tags:         16.04 compiling
created_date: 2018-02-28 01:26:56
edit_date:    2018-03-02 12:47:01
votes:        "6 "
favorites:    
views:        "34,067 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-28-How-can-I-install-_mpich_-library_.md
toc:          false
navigation:   false
clipboard:    true
---

Go to [http://www.mpich.org/downloads/][1] and click on `Xenial` for Ubuntu 16.04. This takes you here: [https://packages.ubuntu.com/xenial/mpich][2]. Then click on `amd64` and you are here: [https://packages.ubuntu.com/xenial/amd64/mpich/download](https://packages.ubuntu.com/xenial/amd64/mpich/download). Where it says:

> If you are running Ubuntu, it is strongly suggested to use a package  
> manager like aptitude or synaptic to download and install packages,  
> instead of doing so manually via this website.  

So instead of installing manually, use:

{% include copyHeader.html %}
``` 
$ sudo apt install mpich
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  cpp-5 g++-5 gcc-5 gcc-5-base gfortran gfortran-5 hwloc-nox libasan2 libatomic1
  libcc1-0 libcilkrts5 libcr-dev libcr0 libgcc-5-dev libgfortran-5-dev libgfortran3
  libgomp1 libhwloc-plugins libhwloc5 libitm1 liblsan0 libmpich-dev libmpich12 libmpx0
  libquadmath0 libstdc++-5-dev libstdc++6 libtsan0 libubsan0
Suggested packages:
  gcc-5-locales g++-5-multilib gcc-5-doc libstdc++6-5-dbg gcc-5-multilib libgcc1-dbg
  libgomp1-dbg libitm1-dbg libatomic1-dbg libasan2-dbg liblsan0-dbg libtsan0-dbg
  libubsan0-dbg libcilkrts5-dbg libmpx0-dbg libquadmath0-dbg gfortran-multilib
  gfortran-doc gfortran-5-multilib gfortran-5-doc libgfortran3-dbg blcr-dkms
  libhwloc-contrib-plugins libstdc++-5-doc blcr-util mpich-doc
The following NEW packages will be installed:
  gfortran gfortran-5 hwloc-nox libcr-dev libcr0 libgfortran-5-dev libhwloc-plugins
  libhwloc5 libmpich-dev libmpich12 mpich
The following packages will be upgraded:
  cpp-5 g++-5 gcc-5 gcc-5-base libasan2 libatomic1 libcc1-0 libcilkrts5 libgcc-5-dev
  libgfortran3 libgomp1 libitm1 liblsan0 libmpx0 libquadmath0 libstdc++-5-dev libstdc++6
  libtsan0 libubsan0
19 upgraded, 11 newly installed, 0 to remove and 213 not upgraded.
Need to get 41.0 MB of archives.
After this operation, 39.0 MB of additional disk space will be used.
Do you want to continue? [Y/n] 
```

At this point click `y` to install the package. 

***There is no need to compile from source like you were attempting to do.***

  [1]: http://www.mpich.org/downloads/
  [2]: https://packages.ubuntu.com/xenial/mpich
