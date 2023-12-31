---
layout:       post
title:        >
    Can't see the windows partitions from Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1240392
type:         Answer
tags:         dual-boot mount windows disk
created_date: 2020-05-16 19:37:36
edit_date:    2020-06-19 21:53:15
votes:        "0 "
favorites:    
views:        "1,808 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-05-16-Can_t-see-the-windows-partitions-from-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

The `df` utility only shows mounted partitions:

```none
$ df -h
Filesystem       Size  Used Avail Use% Mounted on
udev             3.8G  4.0K  3.8G   1% /dev
tmpfs            784M  1.7M  783M   1% /run
/dev/nvme0n1p6    45G   35G  8.0G  82% /
tmpfs            3.9G  363M  3.5G  10% /dev/shm
tmpfs            5.0M  4.0K  5.0M   1% /run/lock
tmpfs            3.9G     0  3.9G   0% /sys/fs/cgroup
/dev/nvme0n1p10   27G   22G  3.9G  85% /mnt/clone
/dev/nvme0n1p4   364G  179G  185G  50% /mnt/c
/dev/nvme0n1p2    95M   33M   63M  35% /boot/efi
/dev/nvme0n1p7    23G   19G  3.1G  86% /mnt/old
/dev/nvme0n1p8   9.1G  1.9G  7.3G  20% /mnt/e
/dev/sda3        920G   42G  878G   5% /mnt/d
tmpfs            784M  140K  784M   1% /run/user/1000
```

Using the `lsblk` utility you can see all partitions:

```none
$ lsblk
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
nvme0n1      259:0    0   477G  0 disk 
├─nvme0n1p9  259:9    0   7.9G  0 part [SWAP]
├─nvme0n1p7  259:7    0  23.1G  0 part /mnt/old
├─nvme0n1p5  259:5    0   859M  0 part 
├─nvme0n1p3  259:3    0    16M  0 part 
├─nvme0n1p1  259:1    0   450M  0 part 
├─nvme0n1p8  259:8    0     9G  0 part /mnt/e
├─nvme0n1p10 259:10   0  27.2G  0 part /mnt/clone
├─nvme0n1p6  259:6    0  45.1G  0 part /
├─nvme0n1p4  259:4    0 363.2G  0 part /mnt/c
└─nvme0n1p2  259:2    0    99M  0 part /boot/efi
sdb            8:16   1  58.6G  0 disk 
sda            8:0    0 931.5G  0 disk 
├─sda4         8:4    0   450M  0 part 
├─sda2         8:2    0   128M  0 part 
├─sda5         8:5    0  11.4G  0 part 
├─sda3         8:3    0   919G  0 part /mnt/d
└─sda1         8:1    0   500M  0 part 
```

In my case I've already mounted Windows partitions as `/mnt/c`, `/mnt/d` and `/mnt/e`. Therefore they can be selected from Nautilus. Using the `lsblk` output above you can use it see your Windows partitions you want to mount. Then see this answer:

- [How to manually mount a partition?]({% post_url /2018/2018-04-28-How-to-manually-mount-a-partition_ %})
