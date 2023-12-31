---
layout:       post
title:        >
    How to format a USB drive with non-removable media?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064714
type:         Answer
tags:         usb mount filesystem format hdparm
created_date: 2018-08-12 16:54:55
edit_date:    
votes:        "0 "
favorites:    
views:        "985 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-How-to-format-a-USB-drive-with-non-removable-media_.md
toc:          false
navigation:   false
clipboard:    false
---

**IMPORTANT**: Ensure `/dev/sdb` is the device for your USB Flash Drive!

Use `lsblk` to confirm it is `/dev/sdb` first:

``` 
$ lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sdb            8:16   1  14.4G  0 disk 
├─sdb4         8:20   1   1.4G  0 part /media/rick/Ubuntu 18.04 LTS amd64
├─sdb2         8:18   1     1M  0 part 
├─sdb5         8:21   1   6.4G  0 part /media/rick/casper-rw
├─sdb3         8:19   1   244M  0 part 
└─sdb1         8:17   1   6.4G  0 part /media/rick/usbdata
sr0           11:0    1  1024M  0 rom  
sda            8:0    0 931.5G  0 disk 
├─sda4         8:4    0   450M  0 part 
├─sda2         8:2    0   128M  0 part 
├─sda5         8:5    0  11.4G  0 part 
├─sda3         8:3    0   919G  0 part /mnt/d
└─sda1         8:1    0   500M  0 part 
nvme0n1      259:0    0   477G  0 disk 
├─nvme0n1p5  259:5    0   858M  0 part 
├─nvme0n1p3  259:3    0    16M  0 part 
├─nvme0n1p1  259:1    0   450M  0 part 
├─nvme0n1p8  259:8    0     9G  0 part /mnt/e
├─nvme0n1p6  259:6    0  23.7G  0 part /
├─nvme0n1p4  259:4    0 363.2G  0 part /mnt/c
├─nvme0n1p10 259:10   0  27.2G  0 part 
├─nvme0n1p2  259:2    0    99M  0 part /boot/efi
├─nvme0n1p9  259:9    0   7.9G  0 part [SWAP]
└─nvme0n1p7  259:7    0  44.6G  0 part /mnt/old
```

Very, very carefully type this command:

``` 
sudo dd if=/dev/zero of=/dev/sdb bs=512 count=1
```

- Wait a moment after command finishes.
- Unplug and replug your USB flash drive.

Verify it's been formatted:

``` 
$ lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sdb            8:16   1  14.4G  0 disk 
sr0           11:0    1  1024M  0 rom  
sda            8:0    0 931.5G  0 disk 
├─sda4         8:4    0   450M  0 part 
├─sda2         8:2    0   128M  0 part 
├─sda5         8:5    0  11.4G  0 part 
├─sda3         8:3    0   919G  0 part /mnt/d
└─sda1         8:1    0   500M  0 part 
nvme0n1      259:0    0   477G  0 disk 
├─nvme0n1p5  259:5    0   858M  0 part 
├─nvme0n1p3  259:3    0    16M  0 part 
├─nvme0n1p1  259:1    0   450M  0 part 
├─nvme0n1p8  259:8    0     9G  0 part /mnt/e
├─nvme0n1p6  259:6    0  23.7G  0 part /
├─nvme0n1p4  259:4    0 363.2G  0 part /mnt/c
├─nvme0n1p10 259:10   0  27.2G  0 part 
├─nvme0n1p2  259:2    0    99M  0 part /boot/efi
├─nvme0n1p9  259:9    0   7.9G  0 part [SWAP]
└─nvme0n1p7  259:7    0  44.6G  0 part /mnt/old
```

- Notice all partitions under `/dev/sdb` are now gone

Now you can run `gparted` to reformat the flash drive.


