---
layout:       post
title:        >
    How do I avoid timeouts and get Apache2 to start at system startup?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1310718
type:         Answer
tags:         apache2 startup services
created_date: 2021-01-24 23:37:03
edit_date:    
votes:        "0 "
favorites:    
views:        "6,694 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-24-How-do-I-avoid-timeouts-and-get-Apache2-to-start-at-system-startup_.md
toc:          false
navigation:   false
clipboard:    false
---

A similar question was asked on our sister site **Unix & Linux**:

- [Services timed out at boot but could start manually what could be the problem?](https://unix.stackexchange.com/questions/412996/services-timed-out-at-boot-but-could-start-manually-what-could-be-the-problem)

In that answer the solution was changing the file `/etc/systemd/system.conf
` and the two lines:

``` 
#DefaultTimeoutStartSec=90s
#DefaultTimeoutStopSec=90s
```

On my machine it is 90 seconds but on the linked answer it was 15 seconds which was too short. If your says 15s then change it to:

``` 
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
```

Note removing the `#` turns the line from a comment to a command.

Also note your `journalctl -xe` doesn't appear to have the apache2 related errors? You probably need to press <kbd>Page Up</kbd> a few times. Alternately you can try using `journalctl -b-0` instead and using  <kbd>Page Down</kbd>.
