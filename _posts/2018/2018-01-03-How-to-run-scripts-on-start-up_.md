---
layout:       post
title:        >
    How to run scripts on start up?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/991672
type:         Answer
tags:         startup autostart
created_date: 2018-01-03 01:02:31
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "1,342,183 "
accepted:     
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-03-How-to-run-scripts-on-start-up_.md
toc:          false
navigation:   false
clipboard:    false
---

# `cron` answer implemented different from top voted

This answer still uses `cron` but uses a different method than the top voted answer. This works since Ubuntu 16.04 but probably supported much sooner. It's just that I started using `cron` to run jobs when computer boots up since 16.04. 

## When does `cron` run?

In comments someone asked "when do they run?". You can tell in syslog / journalctl:

``` 
$ journalctl -b | grep cron
Jan 02 16:54:40 alien cron[919]: (CRON) INFO (pidfile fd = 3)
Jan 02 16:54:40 alien cron[919]: (CRON) INFO (Running @reboot jobs)
Jan 02 16:54:40 alien systemd[1]: Started Run anacron jobs.
Jan 02 16:54:40 alien anacron[949]: Anacron 2.3 started on 2018-01-02
Jan 02 16:54:40 alien anacron[949]: Normal exit (0 jobs run)
Jan 02 16:54:40 alien CRON[952]: pam_unix(cron:session): session opened for user root by (uid=0)
Jan 02 16:54:40 alien CRON[954]: pam_unix(cron:session): session opened for user root by (uid=0)
Jan 02 16:54:40 alien CRON[951]: pam_unix(cron:session): session opened for user root by (uid=0)
Jan 02 16:54:40 alien CRON[950]: pam_unix(cron:session): session opened for user root by (uid=0)
Jan 02 16:54:40 alien CRON[985]: (root) CMD (   /usr/local/bin/cron-reboot-cycle-grub-background)
Jan 02 16:54:40 alien CRON[954]: pam_unix(cron:session): session closed for user root
Jan 02 16:54:40 alien cron[919]: sendmail: Cannot open smtp.gmail.com:587
Jan 02 16:54:40 alien CRON[952]: pam_unix(cron:session): session closed for user root
Jan 02 16:54:40 alien cron[919]: sendmail: Cannot open smtp.gmail.com:587
Jan 02 16:54:40 alien CRON[950]: pam_unix(cron:session): session closed for user root
```

One thing to note is `cron` can email you status of jobs run and `@reboot` jobs run so early network manager and email won't be running unless you put a `sleep` command into your script(s).

## Where to put your scripts

Put your scripts in the directory `/etc/cron.d`:

``` 
$ ll /etc/cron.d
total 44
drwxr-xr-x   2 root root  4096 Nov 26 19:53 ./
drwxr-xr-x 139 root root 12288 Dec 31 13:58 ../
-rw-r--r--   1 root root   244 Dec 28  2014 anacron
-rw-r--r--   1 root root   148 Feb 18  2017 cycle-grub-background
-rw-r--r--   1 root root   138 Mar  5  2017 display-auto-brightness
-rw-r--r--   1 root root   460 Nov 26 19:53 nvidia-hdmi-sound
-rw-r--r--   1 root root   102 Feb  9  2013 .placeholder
-rw-r--r--   1 root root   224 Nov 19  2016 touch-vmlinuz
-rw-r--r--   1 root root   700 Aug  5 11:15 turn-off-hyper-threading
```

## What does a script look like?

Here are a couple of scripts I have setup to run each boot:

``` 
$ cat /etc/cron.d/cycle-grub-background SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin 
@reboot   root    /usr/local/bin/cron-reboot-cycle-grub-background

$ cat /etc/cron.d/touch-vmlinuz
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
@reboot   root    touch "/boot/vmlinuz-"`uname -r`
```

