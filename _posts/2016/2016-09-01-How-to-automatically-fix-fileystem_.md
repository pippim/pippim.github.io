---
layout:       post
title:        >
    How to automatically fix fileystem?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/819806
type:         Answer
tags:         boot filesystem
created_date: 2016-09-01 23:26:02
edit_date:    2017-04-13 12:24:03
votes:        "2 "
favorites:    
views:        "5,938 "
accepted:     Accepted
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-01-How-to-automatically-fix-fileystem_.md
toc:          false
navigation:   false
clipboard:    false
---

The answer to your question is here [how-can-i-make-fsck-run-non-interactively-at-boot-time][1]

File System Check (fsck) isn't run every boot so your "once in a while" could mean errors are always there but fsck isn't run when no errors are reported.

Finding the source of file system errors is important. I would take a look at the error messages in `/var/log/boot.log` and post a new question of what errors there you need help with. Fsck error messages can be in other locations depending on whether upstart or systemd is used for init at boot time.

To force ubuntu to fix all disk errors at boot you need to add FSCKFIX=yes to the file /etc/default/rcS. This tells fsck to run with the -y flag. [1]

  [1]: https://askubuntu.com/questions/151025/how-can-i-make-fsck-run-non-interactively-at-boot-time
