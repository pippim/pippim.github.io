---
layout:       post
title:        >
    How to put the laptop to sleep/hibernatation by closing the LCD lid?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1086247
type:         Answer
tags:         suspend laptop hibernate lid
created_date: 2018-10-22 22:31:21
edit_date:    
votes:        "3 "
favorites:    
views:        "1,087 "
accepted:     
uploaded:     2023-09-12 15:48:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-22-How-to-put-the-laptop-to-sleep_hibernatation-by-closing-the-LCD-lid_.md
toc:          false
navigation:   false
clipboard:    false
---

When an HDMI monitor is plugged in, the system considers it "docked" as if it were plugged into a docking station. As such you need to use:

``` 
sudo -H gedit /etc/systemd/logind.conf
```

Change the line:

``` 
#HandleLidSwitchDocked=ignore
```

to read:

``` 
HandleLidSwitchDocked=suspend
```

Then save the file and reboot.

**Note:** This is the most common solution and if it doesn't work we can explore other options.

