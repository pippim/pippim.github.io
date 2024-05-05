---
layout:       post
title:        >
    How to automatically fix fileystem?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/819806
type:         Answer
tags:         boot filesystem
created_date: 2016-09-01 23:26:02
edit_date:    2023-11-25 22:53:44
votes:        "3 "
favorites:    
views:        "6,835 "
accepted:     Accepted
uploaded:     2024-05-05 11:15:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-01-How-to-automatically-fix-fileystem_.md
toc:          false
navigation:   false
clipboard:    false
---

## Ubuntu 16.04 and later with `systemd`

You do an fsck at every boot with some kernel parameters...

``` 
sudo nano /etc/default/grub
```

find the line that says

``` 
GRUB_CMDLINE_LINUX_DEFAULT
```

and add

``` 
fsck.mode=force  fsck.repair=yes
```

to the existing things there. 

Credit: 

- [Automatically force `fsck -fy`](https://askubuntu.com/a/1007323/307523)

## Ubuntu 16.04 and earlier without `systemd`

The answer to your question is here [How can I make fsck run non-interactively at boot time?[1]

File System Check (fsck) isn't run every boot so your "once in a while" could mean errors are always there but fsck isn't run when no errors are reported.

Finding the source of file system errors is important. I would take a look at the error messages in `/var/log/boot.log` and post a new question of what errors there you need help with. Fsck error messages can be in other locations depending on whether upstart or systemd is used for init at boot time.

To force Ubuntu to fix all disk errors at boot you need to add `FSCKFIX=yes` to the file `/etc/default/rcS`. This tells `fsck` to run with the `-y` flag. [1]

  [1]: https://askubuntu.com/questions/151025/how-can-i-make-fsck-run-non-interactively-at-boot-time
