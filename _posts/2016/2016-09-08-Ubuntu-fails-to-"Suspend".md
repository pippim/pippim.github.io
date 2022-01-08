---
layout:       post
title:        >
    Ubuntu fails to "Suspend"
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/822337
type:         Answer
tags:         14.04 suspend
created_date: 2016-09-08 01:34:48
edit_date:    2020-02-08 18:37:04
votes:        "2 "
favorites:    
views:        "1,398 "
accepted:     
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

In your BIOS setup there can be a setting to `Wake on LAN` or `Wake on USB`. If these are on turn them off and see if that fixes the problem.

I've also found that a bad USB cable connected to a powered-hub can generate error messages in dmesg but I'm not sure if that would wake up the system.

## Update February 8, 2020

These lines in your log file:

``` 
Running hook /usr/lib/pm-utils/sleep.d/60_wpa_supplicant suspend suspend:
Failed to connect to non-global ctrl_ifname: (null)  error: No such file or directory
/usr/lib/pm-utils/sleep.d/60_wpa_supplicant suspend suspend: success.
```
Are perhaps the reason `/lib/systemd/system-sleep/wpasupplicant` was created as described in this [discussion][1]. Check if this file exists and if not see this:

- [Not able to suspend because of Failed to connect to non-global ctrl_ifname: (nil) error: No such file or directory](Not able to suspend because of Failed to connect to non-global ctrl_ifname: (nil) error: No such file or directory)


  [1]: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=835648
