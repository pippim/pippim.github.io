---
layout:       post
title:        >
    Cannot control how often fsck is running on /boot/efi
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/981294
type:         Question
tags:         boot fsck fat32
created_date: 2017-11-29 03:46:57
edit_date:    2017-11-29 09:03:38
votes:        "0 "
favorites:    
views:        "1,965 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-11-29-Cannot-control-how-often-fsck-is-running-on-_boot_efi.md
toc:          false
navigation:   false
clipboard:    false
---

Every boot `fsck` is checking the partition `/efi/boot`. I can control how often it runs on other partitions using `tune2fs` but it won't work with this partition.

## /var/log/syslog reports

``` 
Nov 28 19:59:55 alien systemd-fsck[612]: fsck.fat 3.0.28 (2015-05-16)
Nov 28 19:59:55 alien systemd-fsck[612]: /dev/nvme0n1p2: 239 files, 33140/97280 clusters
```

## listing of partitions
``` 
$ lsdrv
NAME        FSTYPE LABEL            MOUNTPOINT   SIZE MODEL
sda                                            931.5G HGST HTS721010A9
├─sda4      ntfs   WINRETOOLS                    450M 
├─sda2                                           128M 
├─sda5      ntfs   Image                        11.4G 
├─sda3      ntfs   HGST_Win10       /mnt/d       919G 
└─sda1      vfat   ESP                           500M 
nvme0n1                                          477G Samsung SSD 960 PRO 512GB 
├─nvme0n1p5 ext4   NVMe_Ubuntu_16.0 /           44.6G 
├─nvme0n1p3                                       16M 
├─nvme0n1p1 ntfs                                 450M 
├─nvme0n1p6 swap   Linux Swap       [SWAP]       7.9G 
├─nvme0n1p4 ntfs   NVMe_Win10       /mnt/c     414.9G 
├─nvme0n1p2 vfat                    /boot/efi     99M 
└─nvme0n1p7 ntfs   Shared_WSL+Linux /mnt/e         9G 
```

## tune2fs refuses to work on /boot/efi

``` 
$ sudo tune2fs -l /dev/nvme0n1p2
tune2fs 1.42.13 (17-May-2015)
tune2fs: Bad magic number in super-block while trying to open /dev/nvme0n1p2
Couldn't find valid filesystem superblock.
```

**How can I prevent `fsck` running every boot on /boot/efi?**
