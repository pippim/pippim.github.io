---
layout:       post
title:        >
    No launcher and menu bar on ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/811994
type:         Answer
tags:         unity 16.04 launcher compiz
created_date: 2016-08-14 00:11:41
edit_date:    2016-09-19 21:38:21
votes:        "13 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-07 17:32:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-14-No-launcher-and-menu-bar-on-ubuntu-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

Have you tried reinstalling Unity?

``` 
sudo apt-get update
sudo apt-get install --reinstall ubuntu-desktop
sudo apt-get install unity
sudo reboot
```
