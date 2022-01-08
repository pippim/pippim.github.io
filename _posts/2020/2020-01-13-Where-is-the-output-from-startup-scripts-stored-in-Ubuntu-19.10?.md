---
layout:       post
title:        >
    Where is the output from startup scripts stored in Ubuntu 19.10?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1202642
type:         Answer
tags:         boot startup 19.10 log
created_date: 2020-01-13 12:51:21
edit_date:    2020-01-19 14:00:20
votes:        "0 "
favorites:    
views:        "2,602 "
accepted:     Accepted
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

The problem has been around since Ubuntu 16.04:

- [No more boot logging since 16.04?](No more boot logging since 16.04?)

Answers there also recommend `journalctl` but buried in comments:

> I confirm that when configuring `GRUB_CMDLINE_LINUX_DEFAULT=""` in  
> `/etc/default/grub` than `boot.log` is not written. When using  
> `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"` than boot.log is again  
> written. I use Ubuntu 19.04. – adrhc Jun 9 '19 at 11:21  

When I first started using **16.04** I recall `/var/log/boot.log` was empty but I didn't care enough to investigate. I looked after reading this question and now it is populated. There was a bug that has since been fixed:

- [#791907 bootlogd: /var/log/boot is empty with systemd][1]

There may have been a bug regression in **19.10** or the `sysvinit` package is not installed. On my **16.04** installation I have this:
``` 
$ apt list | grep sysv | grep installed

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

    sysv-rc/xenial,xenial,now 2.88dsf-59.3ubuntu2 all [installed]
    sysvinit-utils/xenial,now 2.88dsf-59.3ubuntu2 amd64 [installed]
```

To those that do not know, the advantage of `/var/log/boot.log` over `journalctl -b` is the color formatting that mirrors the console boot messages:

[![boot.log.png][2]][2]


  [1]: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=791907
  [2]: https://i.stack.imgur.com/bRekI.png
