---
layout:       post
title:        >
    How to put the laptop to sleep∕hibernatation by closing the LCD lid?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1086247
type:         Answer
tags:         suspend laptop hibernate lid
created_date: 2018-10-22 22:31:21
edit_date:    
votes:        "3 "
favorites:    
views:        "844 "
accepted:     
uploaded:     2022-01-09 05:38:31
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

