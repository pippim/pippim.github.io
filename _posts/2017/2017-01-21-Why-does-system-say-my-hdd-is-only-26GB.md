---
layout:       post
title:        >
    Why does system say my hdd is only 26GB
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/874374
type:         Answer
tags:         hard-drive
created_date: 2017-01-21 02:24:18
edit_date:    2017-01-21 05:00:41
votes:        "3 "
favorites:    
views:        "117 "
accepted:     Accepted
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-21-Why-does-system-say-my-hdd-is-only-26GB.md
toc:          false
navigation:   false
clipboard:    false
---

That reported disk size is the size of the partition where Ubuntu is installed, not of the entire drive.

To see all partitions, open the Terminal using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and type `lsblk`. You will see something like this:

``` 
$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sdc      8:32   0 119.2G  0 disk 
├─sdc2   8:34   0  58.6G  0 part 
├─sdc3   8:35   0  29.3G  0 part /
└─sdc4   8:36   0   7.8G  0 part [SWAP]
sdd      8:48   1  29.8G  0 disk 
├─sdd1   8:49   1   1.5G  0 part /media/rick/Ubuntu 17.04 amd64
└─sdd2   8:50   1   2.3M  0 part 
sr0     11:0    1  1024M  0 rom  
```


This **Ubuntu 16.04** system is on `sdc3` and shows up as **29.3G**. But the drive itself is 120GB.

In this example, `sdc` is 120 GB drive that shows up as `119.2G` in Gigabytes. Of this `sdc2` is partition 1 (Windows) of 58.6G, `sdc3` is partition 2 (Ubuntu) of 29.3G and `sdc4` is partition 3 (Linux swap) of 7.8G.

In your case, you should find that your Ubuntu partition (mounted on `/`) shows up as 25.9G
