---
layout:       post
title:        >
    Grub lists unknown kernels
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/845620
type:         Answer
tags:         grub2
created_date: !!str "2016-11-04 19:43:00"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "255"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
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
