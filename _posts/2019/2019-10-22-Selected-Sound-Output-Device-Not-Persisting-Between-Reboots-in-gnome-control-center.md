---
layout:       post
title:        >
    Selected Sound Output Device Not Persisting Between Reboots in gnome-control-center
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1183074
type:         Answer
tags:         gnome sound pulseaudio gnome-control-center 19.10
created_date: 2019-10-22 23:19:51
edit_date:    
votes:        "6 "
favorites:    
views:        "2,057 "
accepted:     Accepted
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-22-Selected-Sound-Output-Device-Not-Persisting-Between-Reboots-in-gnome-control-center.md
toc:          false
navigation:   false
clipboard:    false
---

I have had the bug report suggestions setup this way for along time as sound is always routed to TV and I don't want it to switch to tinny laptop speakers.

Use `sudo -H gedit /etc/pulse/default.pa` and find the lines:

``` 
load-module module-switch-on-port-available
load-module module-switch-on-connect
```

Change them to:

``` 
#load-module module-switch-on-port-available
#load-module module-switch-on-connect
```

Save the file and use: `pulseaudio -k`

**Note 1:** It's been reported that plain `sudo` now performs like `sudo -H` in 19.04 but caution dictates using later method.

**Note 2:** Earlier versions of Ubuntu will only have the first configuration line.

