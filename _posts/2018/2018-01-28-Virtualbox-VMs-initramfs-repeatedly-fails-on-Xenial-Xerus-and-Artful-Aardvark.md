---
layout:       post
title:        >
    Virtualbox VMs initramfs repeatedly fails on Xenial Xerus and Artful Aardvark
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1000614
type:         Answer
tags:         virtualbox grub
created_date: 2018-01-28 08:25:49
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "1,519 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-28-Virtualbox-VMs-initramfs-repeatedly-fails-on-Xenial-Xerus-and-Artful-Aardvark.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# Process of elimination

We'll work through your possibilities one by one.


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

## Does update-initramfs work ok?

After your failed distribution upgrade you can still reboot and Grub will have the original kernel available on the **Advance Options** sub-menu. Select it to boot.

After start up open the terminal and type:

``` 
sudo update-initramfs -u
```

This will generate the initramfs for the current kernel. If it works ok then that removes it as a problem.

## Was Ubuntu trying to install a broken kernel?

Find out the current kernel version using `uname -r`:

``` 
$ uname -r
4.14.15-041415-generic
```

Your kernel version will likely be `4.4.0...`, `4.8.0...`, `4.10.0...` or `4.13.0...`. 

List installed kernels using:

``` 
$ dpkg -l | grep linux-image
ii  linux-image-3.16.53-031653-generic         3.16.53-031653.201801090931                  amd64        Linux kernel image for version 3.16.53 on 64 bit x86 SMP
ii  linux-image-4.10.0-28-generic              4.10.0-28.32~16.04.2                         amd64        Linux kernel image for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-4.10.0-37-generic              4.10.0-37.41~16.04.1                         amd64        Linux kernel image for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-4.10.0-38-generic              4.10.0-38.42~16.04.1                         amd64        Linux kernel image for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-4.10.0-40-generic              4.10.0-40.44~16.04.1                         amd64        Linux kernel image for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-4.10.0-42-generic              4.10.0-42.46~16.04.1                         amd64        Linux kernel image for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-4.13.9-041309-generic          4.13.9-041309.201710211231                   amd64        Linux kernel image for version 4.13.9 on 64 bit x86 SMP
ii  linux-image-4.14.10-041410-generic         4.14.10-041410.201712291810                  amd64        Linux kernel image for version 4.14.10 on 64 bit x86 SMP
ii  linux-image-4.14.11-041411-generic         4.14.11-041411.201801022143                  amd64        Linux kernel image for version 4.14.11 on 64 bit x86 SMP
ii  linux-image-4.14.12-041412-generic         4.14.12-041412.201801051649                  amd64        Linux kernel image for version 4.14.12 on 64 bit x86 SMP
ii  linux-image-4.14.13-041413-generic         4.14.13-041413.201801101001                  amd64        Linux kernel image for version 4.14.13 on 64 bit x86 SMP
ii  linux-image-4.14.14-041414-generic         4.14.14-041414.201801201219                  amd64        Linux kernel image for version 4.14.14 on 64 bit x86 SMP
ii  linux-image-4.14.15-041415-generic         4.14.15-041415.201801231530                  amd64        Linux kernel image for version 4.14.15 on 64 bit x86 SMP
ii  linux-image-4.14.2-041402-generic          4.14.2-041402.201711240330                   amd64        Linux kernel image for version 4.14.2 on 64 bit x86 SMP
ii  linux-image-4.14.4-041404-generic          4.14.4-041404.201712050630                   amd64        Linux kernel image for version 4.14.4 on 64 bit x86 SMP
ii  linux-image-4.4.0-101-generic              4.4.0-101.124                                amd64        Linux kernel image for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-4.4.0-103-generic              4.4.0-103.126                                amd64        Linux kernel image for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-4.4.0-104-generic              4.4.0-104.127                                amd64        Linux kernel image for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-4.4.0-98-generic               4.4.0-98.121                                 amd64        Linux kernel image for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-4.9.76-040976-generic          4.9.76-040976.201801100432                   amd64        Linux kernel image for version 4.9.76 on 64 bit x86 SMP
ii  linux-image-4.9.77-040977-generic          4.9.77-040977.201801170430                   amd64        Linux kernel image for version 4.9.77 on 64 bit x86 SMP
ii  linux-image-extra-4.10.0-28-generic        4.10.0-28.32~16.04.2                         amd64        Linux kernel extra modules for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-extra-4.10.0-37-generic        4.10.0-37.41~16.04.1                         amd64        Linux kernel extra modules for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-extra-4.10.0-38-generic        4.10.0-38.42~16.04.1                         amd64        Linux kernel extra modules for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-extra-4.10.0-40-generic        4.10.0-40.44~16.04.1                         amd64        Linux kernel extra modules for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-extra-4.10.0-42-generic        4.10.0-42.46~16.04.1                         amd64        Linux kernel extra modules for version 4.10.0 on 64 bit x86 SMP
ii  linux-image-extra-4.4.0-101-generic        4.4.0-101.124                                amd64        Linux kernel extra modules for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-extra-4.4.0-103-generic        4.4.0-103.126                                amd64        Linux kernel extra modules for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-extra-4.4.0-104-generic        4.4.0-104.127                                amd64        Linux kernel extra modules for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-extra-4.4.0-98-generic         4.4.0-98.121                                 amd64        Linux kernel extra modules for version 4.4.0 on 64 bit x86 SMP
ii  linux-image-generic                        4.4.0.104.109                                amd64        Generic Linux kernel image
ii  linux-image-generic-hwe-16.04              4.10.0.42.44                                 amd64        Generic Linux kernel image
```

On a fresh install you'll only have one kernel version. Whatever the version we will mark it held so the next update doesn't download a newer kernel and try to generate a new `initramfs` on it. Do this using:

``` 
sudo apt-mark hold linux-image-4.14.15-041415-generic
```

***Remember to change 4.14.15-041415-generic with the `uname -r` results earlier***

Notice how we took the results of `uname -r` to look up the full kernel name in apt.

Now run:

``` 
sudo apt update
sudo apt upgrade
```

Did anything break this time?


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

## Does your Virtual Box install ok?

This part I'll leave to you. If it works ok you will know it was upgrading the kernel that broke on your other attempts. If it doesn't work ok then you know it's a problem with Virtual Box and that is where to focus. For example some VMs need newer versions to work with the 4.13 kernel.

To get back onto regular kernel updates you have to unpin the package you held using:

``` 
sudo apt-mark unhold linux-image-4.14.15-041415-generic
```

***Remember to change 4.14.15-041415-generic with the `uname -r` results earlier***

# Virtual Box broken for Kernel 4.13.0-26

Much too late I found this Q&A: [virtualbox crash on kernel 4.13.0-26](virtualbox crash on kernel 4.13.0-26)

You need to Download it from VirtualBox page or add the source to your `/etc/apt/sources.list`:

``` 
deb http://download.virtualbox.org/virtualbox/debian xenial contrib
```

If you use a different version of Ubuntu than 16.04, use the appropriate name instead of `xenial`.

Add Oracle public key:

``` 
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -
```

Update repositories and install virtualbox-5.2:

``` 
sudo apt-get update
sudo apt-get install virtualbox-5.2
```

On one of my laptops, VM didn't want to start before I removed virutalbox-dkms:

``` 
sudo apt-get remove virtualbox-dkms
```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a></div>

