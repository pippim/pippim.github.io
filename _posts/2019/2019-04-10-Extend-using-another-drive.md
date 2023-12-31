---
layout:       post
title:        >
    Extend using another drive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132583
type:         Answer
tags:         symbolic-link
created_date: 2019-04-10 00:02:03
edit_date:    
votes:        "0 "
favorites:    
views:        "2,360 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-10-Extend-using-another-drive.md
toc:          false
navigation:   false
clipboard:    false
---

From: [How to merge multiple hard drives?][1]

Use **LVM** (**L**ogical **V**olume **M**anagement) on Linux.

You can think of LVM as "dynamic partitions", meaning that you can create/resize/delete LVM "partitions" (they're called "Logical Volumes" in LVM-speak) from the command line while your Linux system is running: no need to reboot the system to make the kernel aware of the newly-created or resized partitions.

First of all you can use `fdisk` with `-l` option to get info about your current "Disks", then use it to partition your "Disks" and setting the system type of those partitions to "Linux LVM", after you finish the partitioning of the "Disks", use `pvcreate` to prepare your new partitions for "LVM".

For more info: [https://www.howtoforge.com/linux_lvm](https://www.howtoforge.com/linux_lvm)


  [1]: https://unix.stackexchange.com/questions/329790/how-to-merge-multiple-hard-drives
