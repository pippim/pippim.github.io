---
layout:       post
title:        >
    Turning screen off when running in without window manager running
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1134773
type:         Answer
tags:         command-line screen
created_date: 2019-04-17 22:47:34
edit_date:    
votes:        "1 "
favorites:    
views:        "323 "
accepted:     Accepted
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-17-Turning-screen-off-when-running-in-without-window-manager-running.md
toc:          false
navigation:   false
clipboard:    false
---

I would simply close the laptop lid to keep dust off the keyboard and power off the screen. 

As no desktop manager is running you need to edit `/etc/systemd/logind.conf` and change this line:

``` 
#HandleLidSwitch=suspend
```

to this:

``` 
HandleLidSwitch=ignore
```

Save the file and use `systemctl restart systemd-logind`
