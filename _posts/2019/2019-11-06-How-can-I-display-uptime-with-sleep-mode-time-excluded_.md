---
layout:       post
title:        >
    How can I display uptime with sleep-mode time excluded?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/550656
type:         Answer
tags:         sleep uptime
created_date: 2019-11-06 11:57:44
edit_date:    2019-11-08 16:52:34
votes:        "1 "
favorites:    
views:        "3,018 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-06-How-can-I-display-uptime-with-sleep-mode-time-excluded_.md
toc:          false
navigation:   false
clipboard:    false
---

## Parsing Systemd's `journalctl`

Subtracting the starting time of systemd's `suspend.service` from the start time (when it was resumed) gives the amount of time suspended:

``` 
$ journalctl -b-0 | grep -E 'systemd\[1]: Start.*Suspend'
Oct 31 05:55:19 alien systemd[1]: Starting Suspend...
Oct 31 16:54:26 alien systemd[1]: Started Suspend.
Oct 31 23:21:21 alien systemd[1]: Starting Suspend...
Nov 01 04:29:12 alien systemd[1]: Started Suspend.
 (... SNIP ...)
Nov 07 05:53:36 alien systemd[1]: Starting Suspend...
Nov 07 16:37:36 alien systemd[1]: Started Suspend.
Nov 07 21:07:28 alien systemd[1]: Starting Suspend...
Nov 08 05:08:52 alien systemd[1]: Started Suspend.
```

The entries marked `Started Suspend.` can be interpreted as the time the machine was resumed from suspend.

You can get formatted output with this script:

- [How to get real uptime?]({% post_url /2019/2019-11-07-How-to-get-real-uptime_ %})

This is what the bash script generates:

``` 
$ suspendtime
Oct 31 05:55:19 to Oct 31 16:54:26 lasting 39,547 seconds
Oct 31 23:21:21 to Nov 01 04:29:12 lasting 18,471 seconds
  (... SNIP ...)
Nov 07 05:53:36 to Nov 07 16:37:36 lasting 38,640 seconds
Nov 07 21:07:28 to Nov 08 05:08:52 lasting 28,884 seconds

Linux uptime 693,600 seconds (8 days, 40 minutes)
16 Suspends 457,547 seconds (5 days, 7 hours, 5 minutes, 47 seconds)
Real uptime 236,053 seconds (2 days, 17 hours, 34 minutes, 13 seconds)
```

Linux reports uptime as 8 days and 40 minutes. Taking into account time suspended, it is really 2 days and about 18 hours.



