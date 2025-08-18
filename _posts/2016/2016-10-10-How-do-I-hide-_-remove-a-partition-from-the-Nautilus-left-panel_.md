---
layout:       post
title:        >
    How do I hide / remove a partition from the Nautilus left panel?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/835040
type:         Answer
tags:         nautilus udev luks
created_date: 2016-10-10 00:48:42
edit_date:    2016-10-14 01:09:17
votes:        "9 "
favorites:    
views:        "14,734 "
accepted:     
uploaded:     2025-08-18 11:20:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-10-How-do-I-hide-_-remove-a-partition-from-the-Nautilus-left-panel_.md
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

  [1]: https://pippim.github.io/assets/img/posts/2016/e5LCU.png
  [2]: https://pippim.github.io/assets/img/posts/2016/9zU2z.png
