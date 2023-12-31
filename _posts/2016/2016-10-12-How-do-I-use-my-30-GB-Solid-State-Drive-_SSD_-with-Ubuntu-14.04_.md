---
layout:       post
title:        >
    How do I use my 30 GB Solid State Drive (SSD) with Ubuntu 14.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/836014
type:         Answer
tags:         14.04 partitioning hard-drive ssd intel
created_date: 2016-10-12 10:21:32
edit_date:    
votes:        "0 "
favorites:    
views:        "1,749 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-12-How-do-I-use-my-30-GB-Solid-State-Drive-_SSD_-with-Ubuntu-14.04_.md
toc:          false
navigation:   false
clipboard:    false
---

First you have to ensure your Windows is no longer using the 30GB cache device by decelerating it. Then using Intel's RST windows application you can delete the volume.

I had a 30GB mSata SSD on my laptop that was split between 19 GB Windows Cache and 12 GB Ubuntu Cache (using EnhanceIO) for a year or so and it worked very well. But there was extra work to manage the caching.

Since then I've upgraded the 30GB mSata SSD to 120GB, moved the 500GB HDD from drive bay 1 to drive bay 2 and installed a new 240 GB SSD into drive bay 1:

``` 
rick@dell:~$ lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sdd      8:48   0 186.3G  0 disk 
├─sdd2   8:50   0 178.9G  0 part /media/rick/S3A6550D005
├─sdd3   8:51   0     6G  0 part 
└─sdd1   8:49   0   1.5G  0 part 
sdb      8:16   0 465.8G  0 disk 
├─sdb2   8:18   0 257.4G  0 part 
├─sdb5   8:21   0 200.5G  0 part 
├─sdb3   8:19   0     1K  0 part 
├─sdb1   8:17   0   100M  0 part 
└─sdb6   8:22   0   7.9G  0 part 
sr0     11:0    1  1024M  0 rom  
sdc      8:32   0 119.2G  0 disk 
├─sdc2   8:34   0  78.1G  0 part /mnt/5824BF4E76D68BE2
├─sdc3   8:35   0  29.3G  0 part /
└─sdc4   8:36   0   7.8G  0 part [SWAP]
sda      8:0    0 223.6G  0 disk 
├─sda2   8:2    0   118G  0 part 
└─sda1   8:1    0   100M  0 part 
```

The 120 GB mSata SSD in question is installed as `sdc`. Windows has 78 GB and Ubuntu 16.04 has 29 GB along with 8 GB Swap partition.

The entire Ubuntu operating system and /home directory is installed within the 29 GB partition and performance is really good, especially considering the fact it's only a SATA II (3 GB/s) channel, albeit with a SATA III mSata SSD.

After ensuring Windows is deactivated from using the cache all you need to do is boot with a live CD or USB. At the installation screen select "something else". Re-partition the mSata SSD using `gparted` for Ubuntu and install it there.

I'll expand this answer with more details dependent on comments seeking additional information / clarification.
