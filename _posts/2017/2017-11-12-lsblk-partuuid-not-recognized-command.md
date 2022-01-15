---
layout:       post
title:        >
    lsblk partuuid not recognized command
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/975719
type:         Answer
tags:         usb partitioning
created_date: 2017-11-12 15:15:48
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "2,931 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-11-12-lsblk-partuuid-not-recognized-command.md
toc:          false
navigation:   false
clipboard:    false
---

# PARTUUID doesn't work under Ubuntu 14.04

As per comments under OP question Ubuntu 14.04 doesn't support the `PARTUUID` flag.

# PARTUUID works under Ubuntu 16.04 to show your USB drive

As you can see `PARTUUID` works fine on my Ubuntu 16.04 to show the USB Thumb Drive / Flash Drive's UUID:

``` 
$ lsblk -o NAME,FSTYPE,LABEL,PARTUUID,MOUNTPOINT,SIZE,MODEL
NAME        FSTYPE LABEL            PARTUUID                             MOUNTPOINT   SIZE MODEL
sdb                                                                                   7.6G USB Flash Disk  
└─sdb1      vfat   LIVE_USB         bb958812-01                          /media/ric   7.6G 
sda                                                                                 931.5G HGST HTS721010A9
├─sda4      ntfs   WINRETOOLS       c8cd5c7e-48fc-4aac-8c57-abcf6819b3ce              450M 
├─sda2                              0e4d96d3-5164-4d2f-9786-5e7b5066034e              128M 
├─sda5      ntfs   Image            b929ccc6-7ceb-4c50-a14c-8e41bf9d401f             11.4G 
├─sda3      ntfs   HGST_Win10       8778bdd3-e557-4f16-8fd6-9d44dcfe0c0a /mnt/d       919G 
└─sda1      vfat   ESP              edde67a5-6d32-425b-8e4e-6343b3e3f6f1              500M 
nvme0n1                                                                               477G Samsung SSD 960 PRO
├─nvme0n1p5 ext4   NVMe_Ubuntu_16.0 f1f35cf5-1b79-4d43-84e3-9b10ea3f9e3c /           44.6G 
├─nvme0n1p3                         6471dce0-3ba5-49b9-bd13-667ad8f72b10               16M 
├─nvme0n1p1 ntfs                    f5872f63-c0c7-4136-b65d-b89becdfc138              450M 
├─nvme0n1p6 swap   Linux Swap       4aeb7d53-7ad5-41b2-99f3-cae583bca6b7 [SWAP]       7.9G 
├─nvme0n1p4 ntfs   NVMe_Win10       f354f364-9819-4209-955a-297505eebfd0 /mnt/c     414.9G 
├─nvme0n1p2 vfat                    5a989e57-3bb3-4821-907f-5822bb14a635 /boot/efi     99M 
└─nvme0n1p7 ntfs   Shared_WSL+Linux 1ca41115-5e65-4ade-8825-b9a2807ae51c /mnt/e         9G 

```

