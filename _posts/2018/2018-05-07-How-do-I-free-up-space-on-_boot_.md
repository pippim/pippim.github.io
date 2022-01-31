---
layout:       post
title:        >
    How do I free up space on /boot?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033109
type:         Answer
tags:         boot partitioning dependencies
created_date: 2018-05-07 11:09:14
edit_date:    
votes:        "2 "
favorites:    
views:        "1,513 "
accepted:     
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-07-How-do-I-free-up-space-on-_boot_.md
toc:          false
navigation:   false
clipboard:    false
---

Assuming the two kernels you will want to keep are:

``` 
linux-headers-4.10.0-38 linux-headers-4.10.0-38-generic
linux-headers-4.10.0-40 linux-headers-4.10.0-40-generic
```

So delete the others out of `/boot` to free space:

``` 
sudo rm /boot/*4.10.0-28*
sudo rm /boot/*4.10.0-37*
sudo rm /boot/*4.4.0-103*
sudo rm /boot/*4.4.0-104*
sudo rm /boot/*4.4.0-98*
sudo rm /boot/*4.10.0-28*
sudo rm /boot/*4.10.0-38*
sudo rm /boot/*4.4.0-103*
sudo rm /boot/*4.4.0-98*
```

This will save you about 500 MB in `/boot` but doesn't remove the kernel packages fully. To do that use:

``` 
sudo apt autoremove
```
