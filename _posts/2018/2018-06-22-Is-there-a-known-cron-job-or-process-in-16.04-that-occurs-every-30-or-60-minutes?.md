---
layout:       post
title:        >
    Is there a known cron job or process in 16.04 that occurs every 30 or 60 minutes?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1048709
type:         Answer
tags:         16.04 kernel cron
created_date: 2018-06-22 02:37:21
edit_date:    2018-06-22 10:40:12
votes:        "3 "
favorites:    
views:        "199 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

`cron` is only one of the running daemons that consume CPU cycles and system resources:

``` 
$ ps -eo 'tty,pid,comm' | grep ^? | grep cron
?          841 cron
?          896 cron

```

For a complete list of all 264 on my system I use:

``` 
ps -eo 'tty,pid,comm' | grep ^?

```


So which deamon runs every 30 minutes? The first google hit is the `chef` deamon (not a cooking thing): [https://stackoverflow.com/questions/14905278/chef-daemon-running-every-30-minutes](https://stackoverflow.com/questions/14905278/chef-daemon-running-every-30-minutes)

If it's not documented you would have to check every single daemon's source code to see how often it run.
