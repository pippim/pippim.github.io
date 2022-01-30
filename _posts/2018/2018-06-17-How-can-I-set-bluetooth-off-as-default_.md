---
layout:       post
title:        >
    How can I set bluetooth off as default?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1047455
type:         Answer
tags:         boot bluetooth settings
created_date: 2018-06-17 21:38:02
edit_date:    2018-06-17 23:53:20
votes:        "18 "
favorites:    
views:        "18,990 "
accepted:     Accepted
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-17-How-can-I-set-bluetooth-off-as-default_.md
toc:          false
navigation:   false
clipboard:    false
---

I've tested this and it's persistent across reboots.

Click the bluetooth logo between the keyboard and battery icons on the system tray. Then click the "Bluetooth ON" selection and it changes to "Bluetooth OFF":

[![bluetooth off.gif][1]][1]


----------

After comments I discovered that Ubuntu 18.04 with Gnome interface doesn't work like Ubuntu 16.04 with Unity interface.

The solution is to edit `/etc/default/tlp` and find:

``` 
# Radio devices to disable on startup: bluetooth, wifi, wwan.
# Separate multiple devices with spaces.
#DEVICES_TO_DISABLE_ON_STARTUP="bluetooth wifi wwan"
```

Edit the last line to read:

``` 
DEVICES_TO_DISABLE_ON_STARTUP="bluetooth"
```


  [1]: https://i.stack.imgur.com/DAakY.gif
