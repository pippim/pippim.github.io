---
layout:       post
title:        >
    Intel SkyLake Blank Screen on Ubuntu 16.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/848454
type:         Answer
tags:         multiple-monitors display intel-graphics
created_date: 2016-11-12 06:28:49
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "4,596 "
accepted:     
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-12-Intel-SkyLake-Blank-Screen-on-Ubuntu-16.10.md
toc:          false
navigation:   false
clipboard:    false
---

## Bug Report

Your error:

``` 
[    5.088899] fb: switching to inteldrmfb from VESA VGA
```

Is similar to this one discussed in 2014 bug report: ([Screen freezes on boot at "fb: switching to inteldrmfb from simple"][1]). However it was supposed to have been been fixed in Kernel 3.17 / 3.18.

## Kernel Version 4.8.7

Kernel Version 4.8.7 has many patches for Intel i915 driver (and Radeon which many in AU might be interested in) as discussed here: ([Softpedia News - Linux kernel 4-8-7 updates intel and radeon drivers improves wireless support][2]). Indeed some wireless users might want this kernel update too.

The story provides a link for downloading the kernel but do not use it. Rather go to ([kernel.ubuntu.com ~kernel v4.8.7][3]). If someone needs step by step instructions please comment and I'll add them here.

## Known i915 freezes

The i915 DRM driver is known to cause various GPU hangs, crashes and even full system freezes. It might be necessary to disable hardware acceleration to workaround these issues. 

One solution you haven't tried is to use the following Xorg configuration by editing (or creating) the file `/etc/X11/xorg.conf.d/20-intel.conf` with these lines:

``` 
Section "Device"
    Identifier  "Intel Graphics"
    Driver      "intel"
    Option      "DRI"   "false"
EndSection
```

Save and reboot (without the nomodeset).

If the black screen problems go away but Google-Chrome or Fire Fox freezes you will have to disable hardware acceleration in them.

## Most recent Intel firmware

Another important consideration is your Intel firmware which is discussed in this AU article ([Ubuntu 16.04 Skylake overheating][4]) and it should be at version 3.20160714.1 or later as of Septeber 27, 2016.


  [1]: https://bugzilla.kernel.org/show_bug.cgi?id=86551
  [2]: http://news.softpedia.com/news/linux-kernel-4-8-7-updates-intel-and-radeon-drivers-improves-wireless-support-510122.shtml
  [3]: http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.7/
  [4]: https://askubuntu.com/questions/830404/ubuntu-16-04-skylake-overheating
