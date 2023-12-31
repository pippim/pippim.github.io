---
layout:       post
title:        >
    Slow boot on Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038721
type:         Answer
tags:         boot 18.04 performance
created_date: 2018-05-21 13:53:14
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "4,298 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-21-Slow-boot-on-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

## 18.04 with no swap partition

There is a glitch where Ubuntu 18.04 is boots slow when there is no swap partition. To circumvent this edit `/etc/default/grub` and search for the line with `LINUX` and add `noresume` after `quiet splash`. It will look something like this:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash noresume"
```

Then save the file and run:

``` 
sudo update-grub
```
