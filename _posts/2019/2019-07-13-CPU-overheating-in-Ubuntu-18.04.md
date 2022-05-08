---
layout:       post
title:        >
    CPU overheating in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1158119
type:         Answer
tags:         18.04 cpu overheating temperature intel-cpu
created_date: 2019-07-13 22:31:16
edit_date:    
votes:        "3 "
favorites:    
views:        "5,349 "
accepted:     
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-13-CPU-overheating-in-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

You should see (and possibly subscribe to) this bug report:

- [Thermald sysfs read failed /sys/class/thermal/thermal_zoneX/temp][1]

There have been numerous posts in **Ask Ubuntu** about CPU throttling recently:

- [Core/Package temperature above threshold, cpu clock throttled - Lenovo E590](Core/Package temperature above threshold, cpu clock throttled - Lenovo E590)
- [Set CPU temperature throttle threshold on Ubuntu/Thinkpad](Set CPU temperature throttle threshold on Ubuntu/Thinkpad)
- [XPS 9370 thermal throttling ubuntu 18.04](XPS 9370 thermal throttling ubuntu 18.04)

All these posts say the same thing which happens to me periodically:

``` 
~$ journalctl | grep 'cpu clock throttled'
Jun 22 10:55:52 alien kernel: CPU4: Core temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU0: Core temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU6: Package temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU2: Package temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU3: Package temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU7: Package temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU5: Package temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU1: Package temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU0: Package temperature above threshold, cpu clock throttled (total events = 1)
Jun 22 10:55:52 alien kernel: CPU4: Package temperature above threshold, cpu clock throttled (total events = 1)
```

In my case it happens so rarely and with no adverse side-effects I've chosen to ignore the errors.

Similar launchpad bug reports on the same issue:

- [Erratic behavior of CPU frequency control under load][2]
- [Kernel wrong temperature reporting][3]

And just so you know it's not just Ubuntu, from Redhat:

- [Overheating CPU generates Hardware Error messages][4]


  [1]: https://bugs.launchpad.net/ubuntu/+source/thermald/+bug/1764320
  [2]: https://bugs.launchpad.net/ubuntu/+source/thermald/+bug/1797802
  [3]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1781924
  [4]: https://bugzilla.redhat.com/show_bug.cgi?id=1373881
