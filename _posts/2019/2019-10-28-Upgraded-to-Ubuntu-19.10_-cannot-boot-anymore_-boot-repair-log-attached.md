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
views:        "12,045 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-28-Upgraded-to-Ubuntu-19.10_-cannot-boot-anymore_-boot-repair-log-attached.md
toc:          false
navigation:   false
clipboard:    false
---

19.10 comes with a new version of [Grub 2.04 that many have reported bugs][1] with.

A common solution is to turn off [TPM][2] in BIOS. However other options are detailed in the bug reports and there other things to try if that doesn't work.


  [1]: https://bugs.launchpad.net/ubuntu/+source/grub2/+bug/1848892
  [2]: https://en.wikipedia.org/wiki/Trusted_Platform_Module
