---
layout:       post
title:        >
    Monitor computer use time
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1292992
type:         Answer
tags:         gnome
created_date: 2020-11-17 11:40:39
edit_date:    
votes:        "1 "
favorites:    
views:        "80 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-11-17-Monitor-computer-use-time.md
toc:          false
navigation:   false
clipboard:    false
---

Unfortunately this answer doesn't do everything you want but they are bash scripts you could modify.

First solution would be to have your machine automatically suspend when inactive. Then this [script][1] can be used:

``` 
$ suspendtime
Nov 10 13:51:52 to Nov 10 18:43:27 suspended 4 hours, 51 minutes, 35 seconds
Nov 11 00:33:26 to Nov 11 07:48:14 suspended 7 hours, 14 minutes, 48 seconds
Nov 11 13:23:28 to Nov 11 18:30:26 suspended 5 hours, 6 minutes, 58 seconds
Nov 11 21:48:00 to Nov 12 04:24:46 suspended 6 hours, 36 minutes, 46 seconds
Nov 12 05:51:51 to Nov 12 17:43:22 suspended 11 hours, 51 minutes, 31 seconds
Nov 12 21:51:33 to Nov 13 04:21:19 suspended 6 hours, 29 minutes, 46 seconds
Nov 13 05:54:53 to Nov 13 18:55:32 suspended 13 hours, 39 seconds
Nov 13 20:27:03 to Nov 13 23:11:23 suspended 2 hours, 44 minutes, 20 seconds
Nov 14 00:46:49 to Nov 14 07:27:29 suspended 6 hours, 40 minutes, 40 seconds
Nov 14 13:20:49 to Nov 14 18:56:52 suspended 5 hours, 36 minutes, 3 seconds
Nov 15 00:16:33 to Nov 15 07:33:53 suspended 7 hours, 17 minutes, 20 seconds
Nov 15 13:06:38 to Nov 15 18:07:34 suspended 5 hours, 56 seconds
Nov 15 21:46:09 to Nov 16 04:20:41 suspended 6 hours, 34 minutes, 32 seconds
Nov 16 05:55:28 to Nov 16 18:13:27 suspended 12 hours, 17 minutes, 59 seconds
Nov 16 21:36:22 to Nov 17 04:07:29 suspended 6 hours, 31 minutes, 7 seconds

Linux uptime 582,903 seconds ( 6 days, 17 hours, 55 minutes, 3 seconds)
15 Suspends 388,500 seconds ( 4 days, 11 hours, 55 minutes)
Real uptime 194,403 seconds ( 2 days, 6 hours, 3 seconds)
```


----------


The second solution is close to your needs but has no logging. When you are watching movies this [script][2] dims the other two monitors and records inactivity time in X11:

[![movie.sh status display.png][3]][3]


  [1]: https://askubuntu.com/questions/321855/how-to-get-real-uptime
  [2]: {% post_url /2019/2019-07-01-Turn-off-all-monitors-while-watching-VLC-media-on-TV %}
  [3]: https://i.stack.imgur.com/1OyCj.png
