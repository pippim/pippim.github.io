---
layout:       post
title:        High power consumption through btusb and tick_sched_timer
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1217981
type:         Answer
tags:         dell power-management battery
created_date: 2020-03-17 22:50:35
edit_date:    
votes:        2
favorites:    
views:        5,226
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

If you are not using bluetooth (higher power consumption) you can simply [turn it off][1].

To turn off bluetooth only temporarily, use `rfkill`:

``` 
$ sudo rfkill block bluetooth

```

To permanently turn off bluetooth create a `udev` rule:

``` 
$ sudo -H gedit /etc/udev/rules.d/50-bluetooth.rules

```

Then in the empty file, insert these lines:

``` 
# disable bluetooth
SUBSYSTEM=="rfkill", ATTR{type}=="bluetooth", ATTR{state}="0"

```

Save the file and exist.

Visit the link above for even more power saving tips.

  [1]: https://wiki.archlinux.org/index.php/Power_management#Bluetooth
