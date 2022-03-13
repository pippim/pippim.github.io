---
layout:       post
title:        >
    Cannot suspend with NVMe M.2 SSD
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/981658
type:         Answer
tags:         16.04 suspend ssd nvme
created_date: 2017-11-30 01:52:04
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "4,249 "
accepted:     Accepted
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-11-30-Cannot-suspend-with-NVMe-M.2-SSD.md
toc:          false
navigation:   false
clipboard:    false
---

# NVMe SSD suspend/resume is a know bug

This problem has been reported on [Launchpad][1] and [ArchLinux][2]. The solution is to edit `/etc/default/grub` with `sudo` powers and find the line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet kaslr acpiphp.disable=1 pcie_aspm=off nloglevel=3 udev.log-priority=3"
```

Your options will be different but add the option `acpiphp.disable=1` between the double quotes.

Save the file and run `sudo update-grub`

Reboot and then suspend and resume will work, unless it's a different problem.

# What does `acpiphp.disable=1` do?

According to the [kernel developer][3] in 2013 this disables ACPI hot-plugging. However that doesn't mean hot-plugging is disabled on your machine. For example, replugging the USB cord to your Android phone brings up Nautilus to view files as it should. Also power cycling a second TV connected to your laptop via USB-C ThunderBolt 3 to Displayport to HDMI adapter reorganizes windows across workspaces as it should.


  [1]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1655100
  [2]: https://bbs.archlinux.org/viewtopic.php?id=216520
  [3]: https://patchwork.kernel.org/patch/2436731/
