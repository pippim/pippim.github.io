---
layout:       post
title:        >
    Ubuntu won't dual-boot; Tried BootRepair and still nothing
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035720
type:         Answer
tags:         dual-boot grub
created_date: 2018-05-13 14:32:56
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "39 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-13-Ubuntu-won_t-dual-boot_-Tried-BootRepair-and-still-nothing.md
toc:          false
navigation:   false
clipboard:    false
---

## Tell your BIOS where to go

When you power on your machine press the key(s) to invoke the BIOS setup screen.

Then locate the screen containing the boot up order.

Find the "Ubuntu" boot option and move it higher up the list above the "Windows" boot option.

Save your BIOS changes and exit BIOS setup.

Now `grub` will appear to let you select between Windows and Ubuntu in a normal dual boot setup.

Previously the BIOS was booting directly into Windows and `grub` was never being loaded to give you a choice.
