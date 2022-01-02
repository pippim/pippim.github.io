---
layout:       post
title:        >
    Unusual power management following fresh reinstall of 16.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/839431
type:         Answer
tags:         suspend power-management shutdown 16.10
created_date: 2016-10-20 00:36:28
edit_date:    
votes:        "0 "
favorites:    
views:        "94 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

I'm not sure what's causing the first problem but for your second one you can type:

``` 
gksu gedit /etc/systemd/logind.conf

```

Look for these two lines and change them to look like this:

``` 
HandleLidSwitch=ignore
HandleLidSwitchDocked=ignore

```

These should be the defaults anyway but remove the `#` in front of them if it's there. Save the file and reboot.

From now on when you close the lid hopefully it doesn't suspend as you desire. If not we have to look elsewhere....

