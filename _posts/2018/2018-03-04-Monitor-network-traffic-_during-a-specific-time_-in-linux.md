---
layout:       post
title:        >
    Monitor network traffic "during a specific time" in linux
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1011687
type:         Answer
tags:         networking vnstat
created_date: 2018-03-04 03:03:57
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "2,855 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-04-Monitor-network-traffic-_during-a-specific-time_-in-linux.md
toc:          false
navigation:   false
clipboard:    true
---

# `vnstat -l` does do what you need

Simply open a terminal window and type `vnstat -l`. Then start your program that consumes network bandwidth. When your program ends return to the terminal window and press <kbd>Ctrl</kbd>+<kbd>C</kbd>. The terminal will then show time elapsed and network traffic consumed:

{% include copyHeader.html %}
``` 
$ vnstat -l
Monitoring enp59s0...    (press CTRL-C to stop)

   rx:     1.74 Mbit/s   149 p/s          tx:       32 kbit/s    62 p/s^C


 enp59s0  /  traffic statistics

                           rx         |       tx
--------------------------------------+------------------
  bytes                     7.40 MiB  |         142 KiB
--------------------------------------+------------------
          max            1.84 Mbit/s  |       35 kbit/s
      average            1.68 Mbit/s  |    31.53 kbit/s
          min            1.51 Mbit/s  |       29 kbit/s
--------------------------------------+------------------
  packets                       5215  |            2187
--------------------------------------+------------------
          max                157 p/s  |          68 p/s
      average                144 p/s  |          60 p/s
          min                129 p/s  |          55 p/s
--------------------------------------+------------------
  time                    36 seconds
```


