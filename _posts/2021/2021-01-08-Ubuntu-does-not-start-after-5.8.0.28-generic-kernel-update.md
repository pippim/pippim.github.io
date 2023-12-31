---
layout:       post
title:        >
    Ubuntu does not start after 5.8.0.28 generic kernel update
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1305980
type:         Answer
tags:         drivers apt nvidia kernel
created_date: 2021-01-08 00:21:45
edit_date:    2021-01-08 00:28:15
votes:        "0 "
favorites:    
views:        "557 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-08-Ubuntu-does-not-start-after-5.8.0.28-generic-kernel-update.md
toc:          false
navigation:   false
clipboard:    false
---

Just keep using `5.8.0.26`. Periodically check for a newer kernel version than the broken `5.8.0-28-generic` by using:

``` 
$ ls /boot/vm*
/boot/vmlinuz-3.16.60-031660-generic    /boot/vmlinuz-4.14.188-0414188-generic
/boot/vmlinuz-4.14.110-0414110-generic  /boot/vmlinuz-4.14.70-041470-generic
/boot/vmlinuz-4.14.114-0414114-generic  /boot/vmlinuz-4.14.78-041478-generic
/boot/vmlinuz-4.14.120-0414120-generic  /boot/vmlinuz-4.14.89-041489-generic
/boot/vmlinuz-4.14.134-0414134-generic  /boot/vmlinuz-4.14.98-041498-generic
/boot/vmlinuz-4.14.140-0414140-generic  /boot/vmlinuz-4.15.0-126-generic
/boot/vmlinuz-4.14.153-0414153-generic  /boot/vmlinuz-4.15.0-128-generic
/boot/vmlinuz-4.14.165-0414165-generic  /boot/vmlinuz-4.4.0-197-generic
/boot/vmlinuz-4.14.170-0414170-generic  /boot/vmlinuz-5.0.1-050001-generic
/boot/vmlinuz-4.14.177-0414177-generic
```

Keep in mind my list is unusual. 

When you see something newer than the broken version on your screen reboot and select the most current option of plain old menu option "Ubuntu" and see if it works OK.

You don't have to do anything special to get the newer version it installs with regular updates. You don't have to do anything special to delete the older versions other than `sudo apt autoremove` **after** you confirm the current newest version is working OK. 


----------

# TL;DR

Ignore answers advising to purge just a single package. There can be many packages for a specific kernel version:

``` 
$ apt list | grep 4.15.0-126

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

linux-headers-4.15.0-126/now 4.15.0-126.129~16.04.1 all [installed,local]
linux-headers-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-hwe-tools-4.15.0-126/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-image-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-modules-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-modules-extra-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-tools-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
```

There is clearly more than just:

``` 
linux-image-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
```

installed as another answer suggests.

Let's say you try to remove just one:

``` 
$ sudo apt purge linux-image-4.15.0-126-generic
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages were automatically installed and are no longer required:
  linux-hwe-tools-4.15.0-117 linux-hwe-tools-4.15.0-118 linux-hwe-tools-4.15.0-120
  linux-hwe-tools-4.15.0-122 linux-hwe-tools-4.15.0-123
Use 'sudo apt autoremove' to remove them.
The following packages will be REMOVED:
  linux-image-4.15.0-126-generic* linux-modules-extra-4.15.0-126-generic*
0 upgraded, 0 newly installed, 2 to remove and 59 not upgraded.
After this operation, 179 MB disk space will be freed.
Do you want to continue? [Y/n] y
(Reading database ... 823126 files and directories currently installed.)
Removing linux-modules-extra-4.15.0-126-generic (4.15.0-126.129~16.04.1) ...
Purging configuration files for linux-modules-extra-4.15.0-126-generic (4.15.0-126.129~16.04.1) ...
Removing linux-image-4.15.0-126-generic (4.15.0-126.129~16.04.1) ...
```

Afterwards you still have:

``` 
$ apt list | grep 4.15.0-126

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

linux-headers-4.15.0-126/now 4.15.0-126.129~16.04.1 all [installed,local]
linux-headers-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-hwe-tools-4.15.0-126/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-modules-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
linux-tools-4.15.0-126-generic/now 4.15.0-126.129~16.04.1 amd64 [installed,local]
```
