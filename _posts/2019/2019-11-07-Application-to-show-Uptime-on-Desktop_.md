---
layout:       post
title:        >
    Application to show Uptime on Desktop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1186866
type:         Answer
tags:         12.04 widgets uptime conky
created_date: 2019-11-07 03:47:29
edit_date:    
votes:        "0 "
favorites:    
views:        "830 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-07-Application-to-show-Uptime-on-Desktop_.md
toc:          false
navigation:   false
clipboard:    false
---

As mentioned `conky` is great at showing uptime:

[![uptime.png][1]][1]

However as [this script][2] illustrates Linux uptime is misleading because it includes the time the system was suspended:

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

Linux uptime 576,965 seconds (6 Days 16 Hours 16 Minutes 5 Seconds)
13 Suspends 366,910 seconds (4 Days 5 Hours 55 Minutes 10 Seconds)
Real uptime 210,055 seconds (2 Days 10 Hours 20 Minutes 55 Seconds)
```


  [1]: https://i.stack.imgur.com/hnL8k.png
  [2]: {% post_url /2019/2019-11-07-How-to-get-real-uptime_ %}
