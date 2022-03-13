---
layout:       post
title:        >
    Laptop not coming back from sleep after lid close
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1041762
type:         Answer
tags:         laptop lid
created_date: 2018-05-30 01:57:36
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "725 "
accepted:     Accepted
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-30-Laptop-not-coming-back-from-sleep-after-lid-close.md
toc:          false
navigation:   false
clipboard:    false
---

# NVMe SSD suspend/resume is a know bug

This problem has been reported on [Launchpad][1] and [ArchLinux][2]. The solution is to edit `/etc/default/grub` with `sudo` powers and find the line:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpiphp.disable=1"
```

Your options will be different but add the option `acpihp.disable=1` between the double quotes.

Save the file then reboot. Now suspend and resume will work.

# What does `acpiphp.disable=1` do?

According to the [kernel developer][3] in 2013 this disables ACPI hot-plugging. However that doesn't mean hot-plugging is disabled on your machine. For example, replugging the USB cord to your Android phone brings up Nautilus to view files as it should. Also power cycling a second TV connected to your laptop via USB-C ThunderBolt 3 to Displayport to HDMI adapter reorganizes windows across workspaces as it should.

# Proposed permanent fix

A few days ago a permanent fix was proposed in [kernel `4.15.0-23`][4] by someone who is probably a Ubuntu Developer.


  [1]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1655100
  [2]: https://bbs.archlinux.org/viewtopic.php?id=216520
  [3]: https://patchwork.kernel.org/patch/2436731/
  [4]: https://people.canonical.com/~khfeng/lp1655100-2/
