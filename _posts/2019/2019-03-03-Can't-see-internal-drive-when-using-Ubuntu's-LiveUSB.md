---
layout:       post
title:        >
    Can't see internal drive when using Ubuntu's LiveUSB
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1122768
type:         Answer
tags:         18.04 live-usb gparted ssd fdisk
created_date: 2019-03-03 17:04:05
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "2,566 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

Two things need to be done:

- Create empty space on Windows
- Turn off Fast Startup

# Create empty space on Windows

The first step is to allocate enough space for Ubuntu. With your 250 GB drive 50 GB to 100 GB could be a good balance for Ubuntu.

In Windows 10 start menu type "`Disk Management`" and a screen like this appears:

[![Win 10 Disk Management.png][1]][1]

- On this machine "Disk 1" is used to store 3 Ubuntu partitions and one shared Windows/Ubuntu data partition.
- In order to create extra Ubuntu partitions, the Windows Partition was shrunk from 477 GB to 363 GB.
- Make sure you create empty space at least 20 GB in size however 50 GB to 100 GB would probably suit your needs.
- To create empty space you need to shrink the size of the Windows 10 partition.
- Do not worry about creating a partition in the empty space. Ubuntu Installer will do that for you.


----------


# Turn off Fast Startup

When you boot your computer Windows 10 has a feature to speed up the boot process. This feature though makes it impossible fir Ubuntu to access Windows (NTFS) partitions because they are "locked".

In Windows 10 click the start menu and type "`Power Options`". In the screen that appears click **Choose what the power buttons do**:

[![Win 10 Fast Startup.png][2]][2]

- Notice the check mark next to **Turn on fast startup (recommended)**. Uncheck it.
- Note to keep **Hibernate** unchecked.

  [1]: https://i.stack.imgur.com/JWVNV.png
  [2]: https://i.stack.imgur.com/oaCxn.png
