---
layout:       post
title:        >
    Why is my start-up is ultra slow?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1151767
type:         Answer
tags:         18.04 kubuntu startup
created_date: 2019-06-17 17:13:14
edit_date:    2019-06-17 17:20:42
votes:        "2 "
favorites:    
views:        "1,791 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-17-Why-is-my-start-up-is-ultra-slow_.md
toc:          false
navigation:   false
clipboard:    false
---

Part of the solution can be found here: [Ubuntu 16.04 slow boot (apt-daily.service)](Ubuntu 16.04 slow boot (apt-daily.service))

The accepted answer says:

This is [Debian bug #844453](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=844453).  `apt-daily.service` shouldn't be run during boot, but only some time afterward.

As a workaround, do `sudo systemctl edit apt-daily.timer` and paste the following text into the editor window:

``` 
# apt-daily timer configuration override
[Timer]
OnBootSec=15min
OnUnitActiveSec=1d
AccuracySec=1h
RandomizedDelaySec=30min
```

This changes the "timer" that triggers `apt-daily.service` to run at a random time between 15 min and 45 min after boot, and once a day thereafter.  See the [systemd.timer manpage](http://man7.org/linux/man-pages/man5/systemd.timer.5.html) for additional (not very well written, alas) explanation of what this means.

The second part of the solution can be found here:

- [What is the use of systemd-journal-flush.service?](What is the use of systemd-journal-flush.service?)

I would have merged in but using phone is awkward.
