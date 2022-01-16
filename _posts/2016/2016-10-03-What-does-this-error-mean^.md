---
layout:       post
title:        >
    What does this error mean?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832398
type:         Answer
tags:         kernel
created_date: 2016-10-03 01:33:12
edit_date:    2016-10-04 10:13:23
votes:        "6 "
favorites:    
views:        "12,329 "
accepted:     Accepted
uploaded:     2022-01-15 17:41:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-03-What-does-this-error-mean^.md
toc:          false
navigation:   false
clipboard:    false
---

I found a bug report for Kernel version 4.6.3 and greater where this bug first appeared. It spams `/var/log/syslog` every 10 minutes. This bug was reported as late as Kernel version 4.7.2. Apparently Ubuntu updates to kernel 4.4.0-38 have introduced the bug now.

Also this bug is reported with USB attached drives. Which I presume your `sdb` is.

Apparently it is not a cause for concern other than the fact it spams your `syslog`.

The bug report I found can be followed at: [https://bugzilla.redhat.com/show_bug.cgi?id=1351305][1]


  [1]: https://bugzilla.redhat.com/show_bug.cgi?id=1351305
