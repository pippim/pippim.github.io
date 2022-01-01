---
layout:       post
title:        >
    How to override grub and boot to Ubuntu directly (from UEFI or windows)?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/846297
type:         Answer
tags:         boot dual-boot grub2 uefi
created_date: !!str "2016-11-06 17:55:18"
edit_date:    !!str "2017-03-20 10:18:11"
votes:        !!str "0"
favorites:    
views:        !!str "1,300"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

The first step is to install a Windows program to access Linux partitions from within Windows as described here: ([Best way to access ext partion in windows][1])

The next step is to edit `/boot/grub/grub.cfg` and search for `timeout` changing the value from `0` to `5`.

Save the file and reboot.

Note that after rebooting Ubuntu you still need to change `/etc/default/grub` otherwise the next time you run `sudo update-grub` the timeout will go back to zero.

  [1]: https://superuser.com/questions/717642/best-way-to-access-ext-partion-in-windows
