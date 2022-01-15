---
layout:       post
title:        >
    Unity launch bar and menu bar won't come up on Ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1158115
type:         Answer
tags:         unity launcher grub
created_date: 2019-07-13 22:04:35
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "90 "
accepted:     Accepted
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-13-Unity-launch-bar-and-menu-bar-won't-come-up-on-Ubuntu-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

There's been a few posts lately of launcher disappearing. Most likely everyone suffered from the same update which introduced a bug. When you boot your computer choose from the grub menu "Advanced options for Ubuntu". From the submenu select the next oldest kernel version that works.

Other than that check these Q&As:

- [Unity doesn&#39;t load, no Launcher, no Dash appears](Unity doesn&#39;t load, no Launcher, no Dash appears)
- [Ubuntu 16.04 - Unity doesn&#39;t load - no Launcher or Dash appears](Ubuntu 16.04 - Unity doesn&#39;t load - no Launcher or Dash appears)
- [No launcher and menu bar on ubuntu 16.04](No launcher and menu bar on ubuntu 16.04)
- [Ubuntu Menu and Launcher not showing after 2/16/2018 update](Ubuntu Menu and Launcher not showing after 2/16/2018 update)
- [Ubuntu 16.04 Unity does not load - icons and not displayed](Ubuntu 16.04 Unity does not load - icons and not displayed)


----------


### Edit: July 15, 2019

After answer was accepted a comment was made how system worked in recovery mode. If that's the case try the solution in this answer:

- [Ubuntu Menu and Launcher not showing after 2/16/2018 update](Ubuntu Menu and Launcher not showing after 2/16/2018 update)

Open a terminal and use:

``` 
rm -rf ~/.config/compiz-1/compizconfig/*
sudo reboot

```

When rebooting select the most recent kernel rather than the older recovery option.

