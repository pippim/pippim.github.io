---
layout:       post
title:        >
    Turning screen off when running in without window manager running
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1134773
type:         Answer
tags:         command-line screen
created_date: !!str "2019-04-17 22:47:34"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "316"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
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
