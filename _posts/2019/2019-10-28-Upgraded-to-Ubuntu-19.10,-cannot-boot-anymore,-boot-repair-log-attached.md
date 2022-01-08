---
layout:       post
title:        >
    Upgraded to Ubuntu 19.10, cannot boot anymore, boot repair log attached
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1184572
type:         Answer
tags:         boot grub2 upgrade initramfs 19.10
created_date: 2019-10-28 23:23:48
edit_date:    
votes:        "2 "
favorites:    
views:        "11,828 "
accepted:     
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

19.10 comes with a new version of [Grub 2.04 that many have reported bugs][1] with.

A common solution is to turn off [TPM][2] in BIOS. However other options are detailed in the bug reports and there other things to try if that doesn't work.


  [1]: https://bugs.launchpad.net/ubuntu/+source/grub2/+bug/1848892
  [2]: https://en.wikipedia.org/wiki/Trusted_Platform_Module
