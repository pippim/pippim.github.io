---
layout:       post
title:        >
    Start script on system startup (Ubuntu 16.04.1)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/843328
type:         Answer
tags:         server scripts startup cron autostart
created_date: 2016-10-29 23:04:46
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "21,565 "
accepted:     Accepted
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-29-Start-script-on-system-startup-_Ubuntu-16.04.1_.md
toc:          false
navigation:   false
clipboard:    false
---

The easiest solution is using sudo powers create a file like this in `/etc/cron.d/`:

``` 
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
@reboot   root    mkdir /cronjobs
@reboot   root    sleep 10
@reboot   root    mkdir /cronjobs/demofolder
```

This avoids the use of a script file altogether and works for all users regardless of their home directory name, ie /home/steve, /home/mary, etc.

### Edit - Add `sleep 10`

For whatever reason cron is working too fast, or kernel is working too slow when making directories. An extra line `sleep 10` was necessary between the two `mkdir` lines.

You may not need 10 seconds in between the two make directory commands but 10 works on my system with an SSD.

### Edit 2 - Make full directory path in one command

As per comments below a simpler method is to use:

``` 
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
@reboot   root    mkdir -p -v /cronjobs/demofolder
```

- `-p` (long version `--parents`) tells `mkdir` to automatically create all directory parent levels if they don't exist.
- `-v` (long version `--verbose`) tells `mkdir` to print the names of all directories created.
