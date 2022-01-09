---
layout:       post
title:        >
    Screen brightness stuck at maximum
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/818175
type:         Answer
tags:         screen brightness grub
created_date: 2016-08-29 11:00:36
edit_date:    
votes:        "0 "
favorites:    
views:        "747 "
accepted:     Accepted
uploaded:     2022-01-09 09:42:38
toc:          false
navigation:   false
clipboard:    false
---

I found a bug report on launch pad describing the same problem and some solutions: [Samsung 7 screen brightness][1]

Basically ACPI is implemented improperly on your motherboard with Intel CPU and Radeon graphics. The solution is to add the parameters `acpi_osi=linux` and `acpi_backlight=video` to your kernel command lines in Grub. You can google how to modify grub kernel parameters and ask any questions you have on updating grub.

  [1]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1485246
