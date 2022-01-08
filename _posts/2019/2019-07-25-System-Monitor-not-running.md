---
layout:       post
title:        >
    System Monitor not running
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1161023
type:         Answer
tags:         networking grub2 dpkg
created_date: 2019-07-25 16:13:06
edit_date:    
votes:        "2 "
favorites:    
views:        "182 "
accepted:     
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

I'm not sure what happened to break your system. The missing file `update-initramfs` is looking for is:

``` 
# see udev.conf(5) for details
#
# udevd is started in the initramfs, so when this file is modified the
# initramfs should be rebuilt.

#udev_log="info"

```

You can easily create it with `sudo -H gedit /etc/udev/udev.conf` and pasting in lines above.

Then reinstall the system monitor snap with:

``` 
sudo snap install gnome-system-monitor

```
