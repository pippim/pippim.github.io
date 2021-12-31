---
layout:       post
title:        How to disable access to Win7 disk partition(Dual Boot)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/858225
type:         Answer
tags:         dual-boot 16.04 partitioning
created_date: 2016-12-08 00:13:27
edit_date:    
votes:        1
favorites:    
views:        1,311
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

## Use `disks` to hide the partition in Ubuntu

You want to remove the Windows 7 partition from the left left pane in Nautilus, where it can be mounted even when it's not in `/etc/fstab`. You want to hide the partition so they don't appear in Nautilus or elsewhere through Ubuntu.

Start `Dash` the first option on the `Launcher`

Type `Disks` and you will see the application `Disks` appear. Click on it.

A screen similar to this appears:

[![Open Disks][1]][1]

Left click on a Disk. Then left click on the Partition you want to hide.

Right click on the gear (follows the Left Arrow and `-`) and select `Edit Mount Options` and this screen appears:

[![enter image description here][2]][2]

Uncheck the option `Show in User Interface`.

Click OK and enter password to apply changes. After the next reboot Nautilus won't show the partition. Note that this doesn't erase the partition or delete any data on it.


  [1]: http://i.stack.imgur.com/e5LCU.png
  [2]: http://i.stack.imgur.com/9zU2z.png
