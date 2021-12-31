---
layout:       post
title:        >
    Poor IO performance - PCIe NVMe Samsung 950 pro
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/964094
type:         Answer
tags:         performance io pcie
created_date: !!str "2017-10-12 02:39:22"
edit_date:    !!str "2018-10-08 19:52:57"
votes:        !!str "3"
favorites:    
views:        !!str "36,439"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

This thread is one year old (October 2016). One of the highest upvoted answers recommends an Intel NVMe driver that is two years old (2015).

In February 2017 though Samsung released a [Firmware Update](http://www.samsung.com/semiconductor/minisite/ssd/download/tools.html) that uses a Linux based boot ISO installer. On the same link there are drivers you can install for Windows 7/8/10. I'll be installing both soon on my new Samsung 960 Pro and brand new Dell based i7-6700 laptop. Along with flashing BIOS and updating other Dell based drivers.

I think it's important to revisit these old threads and provide new users with current (as of October 11, 2017 anyways) links so they have all options open.

There are many google searches returned for slow performance of Samsung 960 Pro under Linux being half the speed of Windows so I encourage everyone to search out as many options as possible.


----------

After implementing `scsi_mod.use_blk_mq=1` kernel parameter:

``` 
$ systemd-analyze
Startup finished in 7.052s (firmware) + 6.644s (loader) + 2.427s (kernel) + 8.440s (userspace) = 24.565s

```

Removing the kernel parameter and rebooting:

``` 
$ systemd-analyze
Startup finished in 7.060s (firmware) + 6.045s (loader) + 2.712s (kernel) + 8.168s (userspace) = 23.986s

```

So it would appear now that `scsi_mod.use_blk_mq=1` makes system **slower** not faster. At one time it may have been beneficial though.
