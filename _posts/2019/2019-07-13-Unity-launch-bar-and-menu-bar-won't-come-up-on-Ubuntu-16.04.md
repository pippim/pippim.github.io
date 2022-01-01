---
layout:       post
title:        >
    Unity launch bar and menu bar won't come up on Ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1158115
type:         Answer
tags:         unity launcher grub
created_date: !!str "2019-07-13 22:04:35"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "1"
favorites:    
views:        !!str "90"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

There's been a few posts lately of launcher disappearing. Most likely everyone suffered from the same update which introduced a bug. When you boot your computer choose from the grub menu "Advanced options for Ubuntu". From the submenu select the next oldest kernel version that works.

Other than that check these Q&As:

- https://askubuntu.com/questions/17381/unity-doesnt-load-no-launcher-no-dash-appears
- https://askubuntu.com/questions/962497/ubuntu-16-04-unity-doesnt-load-no-launcher-or-dash-appears
- https://askubuntu.com/questions/811552/no-launcher-and-menu-bar-on-ubuntu-16-04
- https://askubuntu.com/questions/1007026/ubuntu-menu-and-launcher-not-showing-after-2-16-2018-update
- https://askubuntu.com/questions/810091/ubuntu-16-04-unity-does-not-load-icons-and-not-displayed


----------


### Edit: July 15, 2019

After answer was accepted a comment was made how system worked in recovery mode. If that's the case try the solution in this answer:

- https://askubuntu.com/questions/1007026/ubuntu-menu-and-launcher-not-showing-after-2-16-2018-update

Open a terminal and use:

``` 
rm -rf ~/.config/compiz-1/compizconfig/*
sudo reboot

```

When rebooting select the most recent kernel rather than the older recovery option.

