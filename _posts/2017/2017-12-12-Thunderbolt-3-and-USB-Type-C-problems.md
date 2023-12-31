---
layout:       post
title:        >
    Thunderbolt 3 and USB Type-C problems
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/985437
type:         Answer
tags:         usb dell thunderbolt usb-c
created_date: 2017-12-12 03:25:37
edit_date:    
votes:        "1 "
favorites:    
views:        "8,875 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-12-Thunderbolt-3-and-USB-Type-C-problems.md
toc:          false
navigation:   false
clipboard:    false
---

For sure you need to install the latest Alienware 13R3 drivers. Especially flashing the BIOS and Thunderbolt 3. I think there about 10 drivers in total that will be out-of-date from a fresh Windows 10 install.

Secondly, read this ArchLinux setup for [Alienware 13][1] lights and what not.

Thirdly, read this ArchLinux setup for [Dell XP13 (9350)][2] which shares the same Thunderbolt technology with Alienware. There is good information for updating Thunderbolt 3. 

Unfortunately the TBT3 hotplug fix available since Kernel 4.7 hasn't been compiled into Ubuntu Mainline Kernels (as of 4.14.4). You could compile your own kernel with `CONFIG_PCI_HOTPLUG=y`.

Dell is now allowing you to [update Thunderbolt 3 NVM in Linux][3] starting with Kernel 4.13 and getting even better in Kernel 4.15.

Lastly, I noticed many good comments that couldn't be posted as answers because your question has been protected by the community.


  [1]: https://wiki.archlinux.org/index.php/Alienware_13
  [2]: https://wiki.archlinux.org/index.php/Dell_XPS_13_(9350)
  [3]: https://github.com/dell/thunderbolt-nvm-linux
