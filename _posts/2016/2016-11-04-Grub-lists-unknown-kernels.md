---
layout:       post
title:        >
    Grub lists unknown kernels
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/845620
type:         Answer
tags:         grub2
created_date: 2016-11-04 19:43:00
edit_date:    
votes:        "2 "
favorites:    
views:        "257 "
accepted:     
uploaded:     2022-01-02 20:50:10
toc:          false
navigation:   false
clipboard:    false
---

For a definitive answer of what's installed run this:

``` 
ls /boot/vm*

```

If grub menu doesn't agree with the list then run:

``` 
sudo update-grub

```

When you run:

``` 
uname -r

```

It lists the kernel you booted with which isn't always the newest one you might see in advanced options menu.
