---
layout:       post
title:        >
    Nautilus - sidebar menue/mounts - cannot unmount
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/833590
type:         Answer
tags:         nautilus
created_date: 2016-10-05 23:16:40
edit_date:    
votes:        "1 "
favorites:    
views:        "990 "
accepted:     Accepted
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-05-Nautilus---sidebar-menue_mounts---cannot-unmount.md
toc:          false
navigation:   false
clipboard:    false
---

What you see on the left side of Nautilus are your partitions. Mounted ones have the eject button beside them, unmounted ones do not. To mount the partition click on the name. Then you can navigate the folders and files.

You want to hide partitions so they don't appear in Nautilus.

Start `Dash` the first option on the `Launcher`

Type `Open Disks` and you will see the application `Disks` appear. Click on it.

A screen similar to this appears:

[![Open Disks][1]][1]

Left click on a Disk. Then left click on the Partition you want to hide.

Right click on the double cog (follows the Left Arrow and `-`) and select `Edit Partition Options` and this screen appears:

[![enter image description here][2]][2]

Uncheck the option `Show in User Interface`.

Clock OK and enter password to apply changes. After the next reboot Nautilus won't show the partition. Note that this doesn't erase the partition or delete any data on it.

If you need clarification please post a comment below.

  [1]: http://i.stack.imgur.com/e5LCU.png
  [2]: http://i.stack.imgur.com/9zU2z.png
