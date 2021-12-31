---
layout:       post
title:        SED or something to delete everything after first space up to `|`
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1039220
type:         Question
tags:         command-line text-processing stat
created_date: 2018-05-23 01:09:44
edit_date:    2018-05-23 08:12:41
votes:        0
favorites:    
views:        824
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

I have a little bash snippet I'm working on:

``` 
$ stat --printf=%A\|%U\|%G\|%s\|%y\|%N'\n' /usr/src/linux-headers-4.4.0-124/zfs/cmd/zhack
drwxr-xr-x|root|root|4096|2018-05-17 05:54:49.361904361 -0600|'/usr/src/linux-headers-4.4.0-124/zfs/cmd/zhack

```

The date is rather ugly so I'd like to use `sed` (or whatever works) to delete everything after the first space up to the following `|`. Of course if the `stat` command can print the date normally that works too!

Any tips for the `sed` challenged?

