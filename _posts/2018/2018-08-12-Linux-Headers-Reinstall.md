---
layout:       post
title:        >
    Linux-Headers Reinstall
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064720
type:         Answer
tags:         linux-headers
created_date: 2018-08-12 17:12:51
edit_date:    2018-08-13 00:22:20
votes:        "0 "
favorites:    
views:        "49,661 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-Linux-Headers-Reinstall.md
toc:          false
navigation:   false
clipboard:    false
---

These commands worked for me.

## Find `linux-headers-4.4.0-98`

``` 
$ apt-cache search linux-headers-4.4.0-98
linux-headers-4.4.0-98 - Header files related to Linux kernel version 4.4.0
linux-headers-4.4.0-98-generic - Linux kernel headers for version 4.4.0 on 64 bit x86 SMP
linux-headers-4.4.0-98-lowlatency - Linux kernel headers for version 4.4.0 on 64 bit x86 SMP
```

## Install `linux-headers-4.4.0-98`

For your reinstall you will type:

``` 
sudo apt install --reinstall linux-headers-4.4.0-98-generic
```

But for myself it's a new package so I'll use:

``` 
$ sudo apt install linux-headers-4.4.0-98-generic
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following additional packages will be installed:
  linux-headers-4.4.0-98
The following NEW packages will be installed:
  linux-headers-4.4.0-98 linux-headers-4.4.0-98-generic
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 10.7 MB of archives.
After this operation, 78.2 MB of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 http://ca.archive.ubuntu.com/ubuntu xenial-updates/main amd64 linux-headers-4.4.0-98 all 4.4.0-98.121 [9,913 kB]
Get:2 http://ca.archive.ubuntu.com/ubuntu xenial-updates/main amd64 linux-headers-4.4.0-98-generic amd64 4.4.0-98.121 [793 kB]
Fetched 10.7 MB in 3s (3,463 kB/s)                  
Selecting previously unselected package linux-headers-4.4.0-98.
(Reading database ... 288111 files and directories currently installed.)
Preparing to unpack .../linux-headers-4.4.0-98_4.4.0-98.121_all.deb ...
Unpacking linux-headers-4.4.0-98 (4.4.0-98.121) ...
Selecting previously unselected package linux-headers-4.4.0-98-generic.
Preparing to unpack .../linux-headers-4.4.0-98-generic_4.4.0-98.121_amd64.deb ...
Unpacking linux-headers-4.4.0-98-generic (4.4.0-98.121) ...
Setting up linux-headers-4.4.0-98 (4.4.0-98.121) ...
Setting up linux-headers-4.4.0-98-generic (4.4.0-98.121) ...
Examining /etc/kernel/header_postinst.d.
run-parts: executing /etc/kernel/header_postinst.d/dkms 4.4.0-98-generic /boot/vmlinuz-4.4.0-98-generic
```

## Remove `linux-headers-4.4.0-98`

Because this was a test and I don't need them on my machine:

``` 
$ sudo apt remove --purge linux-headers-4.4.0-98-generic
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following package was automatically installed and is no longer required:
  linux-headers-4.4.0-98
Use 'sudo apt autoremove' to remove it.
The following packages will be REMOVED:
  linux-headers-4.4.0-98-generic*
0 upgraded, 0 newly installed, 1 to remove and 0 not upgraded.
After this operation, 7,431 kB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 314874 files and directories currently installed.)
Removing linux-headers-4.4.0-98-generic (4.4.0-98.121) ...
dpkg: warning: while removing linux-headers-4.4.0-98-generic, directory '/lib/modules/4.4.0-98-generic' not empty so not removed
```

## Cleanup leftover garbage

I see there is left over garbage in the last line so I'll manually clean it up:

``` 
$ sudo rm -rf /lib/modules/4.4.0-98-generic
$ ll /lib/modules/4.4.0-98-generic
ls: cannot access '/lib/modules/4.4.0-98-generic': No such file or directory
```

Now `4.4.0-98` is almost removed. It is completely removed with:

``` 
sudo apt autoremove
```
