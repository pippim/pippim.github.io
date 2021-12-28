---
layout:       post
title:        How do I hide / remove a partition from the Nautilus left panel?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/835040
type:         Answer
tags:         nautilus udev luks
created_date: 2016-10-10 00:48:42
edit_date:    2016-10-14 01:09:17
votes:        8
favorites:    
views:        10,916
accepted:     
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

This question deserves an update for Ubuntu 16.04 with user friendly steps.

What you see on the left side of Nautilus are your partitions. Mounted ones have the eject button beside them, unmounted ones do not. To mount the partition click on the name. Then you can navigate the folders and files.

You want to hide partitions so they don't appear in Nautilus.

Start `Dash` the first option on the `Launcher`

Type `Disks` and you will see the application `Disks` appear. Click on it.

A screen similar to this appears:

[![Open Disks][1]][1]

Left click on a Disk. Then left click on the Partition you want to hide.

Right click on the gear (follows the Left Arrow and `-`) and select `Edit Mount Options` and this screen appears:

[![enter image description here][2]][2]

Uncheck the option `Show in User Interface`.

Click OK and enter password to apply changes. After the next reboot Nautilus won't show the partition. Note that this doesn't erase the partition or delete any data on it.

If you need clarification please post a comment below.

  [1]: http://i.stack.imgur.com/e5LCU.png
  [2]: http://i.stack.imgur.com/9zU2z.png
