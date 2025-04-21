---
layout:       post
title:        >
    Module disabled after kernel upgrade
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/828903
type:         Answer
tags:         upgrade kernel dkms
created_date: 2016-09-24 00:04:02
edit_date:    
votes:        "2 "
favorites:    
views:        "1,330 "
accepted:     
uploaded:     2025-04-21 05:23:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-24-Module-disabled-after-kernel-upgrade.md
toc:          false
navigation:   false
clipboard:    false
---

`acpi_call` is not a regular program but a kernel module. Kernel modules must be compiled to a specific kernel version, else they are deemed incompatible and will not load.

`DKMS` (Dynamic Kernel Management System) will manage your custom kernel modules and recompile them within the current running kernel version and do so automatically whenever you download a new version. It will also update `initrd` which is part of the bootstrap loader process (nick-named boot). A unique **initrd** is in your `/boot` directory for each unique kernel version you have installed.

As **CelticWarrior** pointed out you can read detailed installation instructions for Ubuntu in: [help.ubuntu.com/community/DKMS][1]. 

The project page itself is at: [linux.dell.com/dkms/][2] and it contains some additional links you will find helpful.

I used **DKMS** for keeping `EnhanceIO` (A HDD to SSD caching program previously used for facebook servers) up to date. **DKMS** automatically compiled for various kernel versions and it works very well. Pay attention to error messages because parameters can change between kernel versions and new source code patches may be required from `github`.

For interested readers, the thought of compiling Kernel modules seems daunting at first but, once you get into it you'll feel comfortable.

  [1]: https://help.ubuntu.com/community/DKMS
  [2]: http://linux.dell.com/dkms/
