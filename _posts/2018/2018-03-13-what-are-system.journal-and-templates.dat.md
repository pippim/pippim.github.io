---
layout:       post
title:        >
    what are system.journal and templates.dat
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1014370
type:         Answer
tags:         files filesystem log
created_date: 2018-03-13 01:58:22
edit_date:    2018-03-13 02:07:20
votes:        "0 "
favorites:    
views:        "1,027 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

Reducing log files to 10 MB seems overly optimistic. On my system `/var/log` is 194 MB:

``` 
$ sudo du -h -d1 /var/log
148K	/var/log/lightdm
8.0K	/var/log/hp
4.0K	/var/log/speech-dispatcher
4.0K	/var/log/dist-upgrade
1.7M	/var/log/installer
4.0K	/var/log/upstart
4.0K	/var/log/gdm3
160K	/var/log/apt
185M	/var/log/journal
12K     /var/log/fsck
68K     /var/log/cups
4.0K	/var/log/unattended-upgrades
194M	/var/log

```

The journal log file in question is 185 MB on my system and was 312 MB before I used the [vacuum cleaner][1] (function's real name) to reduce it's size below 200 MB.

As far as `/var/log/installer/cdebconf/` goes there is no such directory on my machine. I did find a [reference][2] where 75 GB was consumed there for someone else.


  [1]: {% post_url /2018/2018-03-08-Systemd-logs-(`journalctl`)-are-too-large-and-slow %}
  [2]: http://forums.debian.net/viewtopic.php?f=30&t=118776
