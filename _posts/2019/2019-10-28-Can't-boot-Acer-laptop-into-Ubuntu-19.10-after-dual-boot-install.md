---
layout:       post
title:        >
    Can't boot Acer laptop into Ubuntu 19.10 after dual boot install
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1184573
type:         Answer
tags:         dual-boot grub2 uefi windows-10 19.10
created_date: !!str "2019-10-28 23:25:18"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "2,700"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

19.10 comes with a new version of [Grub 2.04 that many have reported bugs][1] with.

A common solution is to turn off [TPM][2] in BIOS. However other options are detailed in the bug reports and there other things to try if that doesn't work.


  [1]: https://bugs.launchpad.net/ubuntu/+source/grub2/+bug/1848892
  [2]: https://en.wikipedia.org/wiki/Trusted_Platform_Module
