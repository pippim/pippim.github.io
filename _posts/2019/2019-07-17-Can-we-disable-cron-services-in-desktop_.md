---
layout:       post
title:        >
    Can we disable cron services in desktop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1159021
type:         Answer
tags:         16.04 18.04 security cron malware
created_date: 2019-07-17 17:19:19
edit_date:    2019-07-18 00:35:05
votes:        "2 "
favorites:    
views:        "2,065 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-17-Can-we-disable-cron-services-in-desktop_.md
toc:          false
navigation:   false
clipboard:    true
---

*Note:* This is for companies with multi-million dollar yearly operating budgets. It would take a week to setup and requires an hour or two after upgrades to audit and even more to incorporate new scripts from an upgrade.

In comments it was mentioned `logrotate` gets called daily. This is an important part of Ubuntu for keeping log files down to size. If you are so concerned about `cron` you pull it fro mservice you would have to create your own script which mimicked `cron`. I'll call this script `crony`. You can keep it locked down in a place hackers wouldn't think to look for it.



Let's look at the files in `/etc/cron.daily`:

``` bash
-rwxr-xr-x   1 root root   311 Feb 19  2014 0anacron*
-rwxr-xr-x   1 root root   376 Apr  4  2014 apport*
-rwxr-xr-x   1 root root  1474 Oct 31  2016 apt-compat*
-rwxr-xr-x   1 root root   314 Nov 26  2015 aptitude*
-rwxr-xr-x   1 root root   355 Jun  4  2013 bsdmainutils*
-rwxr-xr-x   1 root root   384 Mar 23  2014 cracklib-runtime*
-rwxr-xr-x   1 root root  1597 Nov 26  2015 dpkg*
lrwxrwxrwx   1 root root    37 Jun  4 01:43 google-chrome -> /opt/google/chrome/cron/google-chrome*
-rwxr-xr-x   1 root root  7613 Jan 17  2017 google-earth*
-rwxr-xr-x   1 root root 13944 Mar  4 17:48 google-earth-pro*
-rwxr-xr-x   1 root root   372 Jan 22  2014 logrotate*
-rwxr-xr-x   1 root root  1293 Nov  6  2015 man-db*
-rwxr-xr-x   1 root root   435 Jun 20  2013 mlocate*
-rwxr-xr-x   1 root root   249 Feb 16  2014 passwd*
-rw-r--r--   1 root root   102 Feb  9  2013 .placeholder
-rwxr-xr-x   1 root root  3449 Feb 26  2016 popularity-contest*
-rwxr-xr-x   1 root root   383 Mar  7  2016 samba*
-rwxr-xr-x   1 root root   214 Apr  9  2014 update-notifier-common*
-rwxr-xr-x   1 root root  1046 May 19  2016 upstart*
```

The script `mlocate` I don't even use daily. I have it run every 15 minutes because daily isn't enough for my liking. the script `popularity-contest` is [kind of like spyware][1] so I wouldn't call it with `crony` if I were replacing `cron`.

I would call all my `crony` scrips from `/etc/rc.local` but there are other ways of doing it.

The format would be like this:

{% include copyHeader.html %}
``` bash
$ cat /etc/rc.local

#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Jan 05 2018 - Reload Logitech Unifying Receiver to get Mouse in Power Stats
modprobe -r hid_logitech_dj
modprobe    hid_logitech_dj

# Call crony to mimick cron's duties
# daemonize job   boot delay   sleep interval
crony /etc/cron.daily/mlocate 1m 15m &
crony /etc/cron.daily/logrotate 30m d &
crony /mnt/e/usr/local/bin/daily-backup 5m d &
corny /usr/local/bin/eyesome-sun.sh 1m d &

exit 0
```

This is what a typical installation has for entries that are already setup in `/etc/rc.local` along with new `crony` entries after them. The last two of my `crony` entries are custom scripts my machine has in `/etc/cron.daily`

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: crony
# PATH: /usr/local/bin
# DATE: July 17, 2019
# NOTE: For Ask Ubuntu: https://askubuntu.com/questions/1159014/can-we-disable-cron-services-in-desktop

logger "$0"

sleep "$2"

while true; do
    "$1"
    # If if parameter 2 is "d" for 1 day interval we can't sleep for a day
    # because laptop may have been suspended. Use 10 minutes to minimize resources
    sleep 10m
    # Check if time to process job again. If not continue
    continue

done
```

`crony` script needs more work but you get the general idea. This may or may not be a good project for WSL (Windows Subsystem for Linux) in which case I may finish it.

  [1]: https://askubuntu.com/questions/57808/what-is-the-popularity-contest-package-for

