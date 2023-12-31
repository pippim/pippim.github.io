---
layout:       post
title:        >
    HP Elite Thunderbolt 3 and Dell XPS 13 in Ubuntu 16.10 problem
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/985428
type:         Answer
tags:         usb-c
created_date: 2017-12-12 03:04:04
edit_date:    
votes:        "0 "
favorites:    
views:        "1,318 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-12-HP-Elite-Thunderbolt-3-and-Dell-XPS-13-in-Ubuntu-16.10-problem.md
toc:          false
navigation:   false
clipboard:    false
---

ArchLinux has a nice write-up on the [DEL XPS 13 (9350)][1].

Firstly your BIOS was updated 2017-09-28. You'll need to boot with a modern Windows version to install it.

Thunderbolt3 Hotplug support for this port requires a bug fix which landed in kernel version 4.7. It also requires the kernel to be built with CONFIG_PCI_HOTPLUG=y. I just checked Ubuntu Mainline Kernel 4.14.4 and sadly it doesn't appear compiled with this option. Hopefully the **Ubuntu Kernel Team** gets around to adding this configuration option soon.

Starting with Kernel 4.13 Dell allows [Thunderbolt NVM updates over Linux][2]. New apps are available to flash the Thunderbolt controller.


  [1]: https://wiki.archlinux.org/index.php/Dell_XPS_13_(9350)
  [2]: https://github.com/dell/thunderbolt-nvm-linux
