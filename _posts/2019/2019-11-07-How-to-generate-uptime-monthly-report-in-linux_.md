---
layout:       post
title:        >
    How to generate uptime monthly report in linux?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186865
type:         Answer
tags:         command-line uptime
created_date: 2019-11-07 03:42:46
edit_date:    
votes:        "0 "
favorites:    
views:        "2,401 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-07-How-to-generate-uptime-monthly-report-in-linux_.md
toc:          false
navigation:   false
clipboard:    false
---

There is no mention anywhere if `tuptime` takes into account the time system was suspended. If it does not you can use [this script][1] to calculate suspend time and subtract it from uptime:

``` 
$ suspendtime
Oct 31 05:55:19 to Oct 31 16:54:26 lasting 39,547 seconds
Oct 31 23:21:21 to Nov 01 04:29:12 lasting 18,471 seconds
Nov 01 05:51:27 to Nov 01 17:08:34 lasting 40,627 seconds
Nov 02 00:01:33 to Nov 02 10:28:46 lasting 37,633 seconds
Nov 02 18:15:59 to Nov 02 19:10:14 lasting 3,255 seconds
Nov 02 21:17:33 to Nov 03 05:31:54 lasting 33,261 seconds
Nov 03 12:06:39 to Nov 03 14:22:50 lasting 8,171 seconds
Nov 03 22:28:12 to Nov 04 04:17:13 lasting 20,941 seconds
Nov 04 05:49:40 to Nov 04 16:48:52 lasting 39,552 seconds
Nov 04 21:45:48 to Nov 05 04:19:26 lasting 23,618 seconds
Nov 05 05:52:05 to Nov 05 16:32:38 lasting 38,433 seconds
Nov 05 21:12:18 to Nov 06 04:16:50 lasting 25,472 seconds
Nov 06 05:50:45 to Nov 06 16:22:54 lasting 37,929 seconds

Linux uptime 576,297 seconds (6 Days 16 Hours 4 Minutes 57 Seconds)
13 Suspends 366,910 seconds (4 Days 5 Hours 55 Minutes 10 Seconds)
Real uptime 209,387 seconds (2 Days 10 Hours 9 Minutes 47 Seconds)
```

Note the script only looks at `journalctl` for the current boot. You need to turn on  jounralctl multi-boot logging:

- [How to find previous boot log after Ubuntu 16.04+ restarts?](How to find previous boot log after Ubuntu 16.04+ restarts?)

Also note the linked bash script would need to be modified to calculate previous boots.

  [1]: https://askubuntu.com/a/1186845/307523
