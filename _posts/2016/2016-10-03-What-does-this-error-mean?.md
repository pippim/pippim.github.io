---
layout:       post
title:        >
    What does this error mean?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832398
type:         Answer
tags:         kernel
created_date: !!str "2016-10-03 01:33:12"
edit_date:    !!str "2016-10-04 10:13:23"
votes:        !!str "6"
favorites:    
views:        !!str "12,289"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

I found a bug report for Kernel version 4.6.3 and greater where this bug first appeared. It spams `/var/log/syslog` every 10 minutes. This bug was reported as late as Kernel version 4.7.2. Apparently Ubuntu updates to kernel 4.4.0-38 have introduced the bug now.

Also this bug is reported with USB attached drives. Which I presume your `sdb` is.

Apparently it is not a cause for concern other than the fact it spams your `syslog`.

The bug report I found can be followed at: [https://bugzilla.redhat.com/show_bug.cgi?id=1351305][1]


  [1]: https://bugzilla.redhat.com/show_bug.cgi?id=1351305
