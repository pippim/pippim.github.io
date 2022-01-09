---
layout:       post
title:        >
    Unable to wake with external keyboard while lid is closed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1060397
type:         Answer
tags:         16.04 suspend hibernate lid
created_date: 2018-07-28 22:08:57
edit_date:    
votes:        "2 "
favorites:    
views:        "2,937 "
accepted:     
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

This related answer might be helpful:

- [Wake up from suspend using wireless USB keyboard or mouse (for any Linux Distro)](Wake up from suspend using wireless USB keyboard or mouse (for any Linux Distro))

You don't mention if your keyboard is wired or wireless. The basic steps are:

``` 
grep . /sys/bus/usb/devices/*/power/wakeup

```

And then (assuming 8 ports are returned) use:

``` 
sudo su
echo enabled > /sys/bus/usb/devices/usb1/power/wakeup
echo enabled > /sys/bus/usb/devices/usb2/power/wakeup
echo enabled > /sys/bus/usb/devices/usb3/power/wakeup
echo enabled > /sys/bus/usb/devices/usb4/power/wakeup
echo enabled > /sys/bus/usb/devices/usb5/power/wakeup
echo enabled > /sys/bus/usb/devices/usb6/power/wakeup
echo enabled > /sys/bus/usb/devices/usb7/power/wakeup
echo enabled > /sys/bus/usb/devices/usb8/power/wakeup
exit

```

See the accepted answer for all the steps.

