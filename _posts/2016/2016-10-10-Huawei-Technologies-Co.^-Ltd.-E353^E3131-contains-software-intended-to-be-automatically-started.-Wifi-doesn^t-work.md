---
layout:       post
title:        >
    Huawei Technologies Co., Ltd. E353/E3131 contains software intended to be automatically started. Wifi doesn't work
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/835125
type:         Answer
tags:         16.04 usb internet
created_date: 2016-10-10 07:33:19
edit_date:    2016-10-10 15:17:31
votes:        "3 "
favorites:    
views:        "7,064 "
accepted:     
uploaded:     2022-01-29 11:32:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-10-Huawei-Technologies-Co.^-Ltd.-E353^E3131-contains-software-intended-to-be-automatically-started.-Wifi-doesn^t-work.md
toc:          false
navigation:   false
clipboard:    false
---

Your `sudo fdisk -l` output with the adapter unplugged contains the following at line 112:

``` 
Disk /dev/sdb: 3,7 GiB, 4003463168 bytes, 7819264 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xc3072e18

Device     Boot Start     End Sectors  Size Id Type
/dev/sdb1  *     8064 7819263 7811200  3,7G  c W95 FAT32 (LBA)
```

The output with your adapter unplugged ends at line 107.


----------


## Edit 1 - New Information from OP


Here is a screenshot of USB files:

[![USB Startup][1]][1]

In order to disable auto-run of the USB (generating the error message) go to `System Settings`, `Details`, `Removable Media` and check the last box to never auto-run inserted media:

[![Removable Media][2]][2]

This should make the error message go away when the USB is inserted.

  [1]: http://i.stack.imgur.com/idEdJ.png
  [2]: http://i.stack.imgur.com/x0e5T.png
