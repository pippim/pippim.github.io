---
layout:       post
title:        >
    Why are there two kernels under `∕lib∕modules` on 16.04 LTS?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/852797
type:         Answer
tags:         kernel
created_date: 2016-11-23 18:11:24
edit_date:    2016-11-25 00:20:21
votes:        "8 "
favorites:    
views:        "3,038 "
accepted:     
uploaded:     2022-01-14 04:38:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-23-Why-are-there-two-kernels-under-`∕lib∕modules`-on-16.04-LTS?
toc:          false
navigation:   false
clipboard:    false
---

It is common to keep one older kernel version around in case the new one breaks.

The previous version is available on grub's `Advanced Options` menu.

Kernels that Ubuntu automatically installs can be automatically removed by using:

``` 
sudo apt autoremove

```

This removes older kernels (that Ubuntu automatically installed) but keeps the current version and the one before it.

When you manually install kernels (often necessary to get new hardware support or address a certain "glitch" you have) you need to manually remove them.

``` 


```
