---
layout:       post
title:        When I close the lid of my laptop, the Wifi should not disconnect automatically
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/830562
type:         Answer
tags:         wireless 16.04 lid
created_date: 2016-09-28 01:37:15
edit_date:    2016-09-28 02:12:25
votes:        3
favorites:    
views:        6,583
accepted:     
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

At first I didn't understand your question but then surmised if you are closing your lid and want WiFi to stay on that must mean you have your Laptop docked or have an HDMI monitor attached and the system is suspending the Wifi.

You already edited `logind.conf` once and need to again. Set the line:

``` 
HandleLidSwitchDocked=ignore

```

Then save the file and reboot. Hopefully this solves the problem. If so mark this as solution by clicking check mark, if not post a comment.
