---
layout:       post
title:        >
    How do I free up space on ∕boot?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033109
type:         Answer
tags:         boot partitioning dependencies
created_date: !!str "2018-05-07 11:09:14"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "1,473"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
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
