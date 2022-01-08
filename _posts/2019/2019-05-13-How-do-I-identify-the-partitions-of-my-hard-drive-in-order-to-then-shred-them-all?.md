---
layout:       post
title:        >
    How do I identify the partitions of my hard drive in order to then shred them all?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1142845
type:         Answer
tags:         partitioning hard-drive format
created_date: 2019-05-13 10:45:35
edit_date:    
votes:        "2 "
favorites:    
views:        "2,870 "
accepted:     
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    true
---

To get a more meaningful report from `lsblk` without the **noise** from dozens of `loop` devices use:

{% include copyHeader.html %}
``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL | egrep -v "^loop"

NAME         FSTYPE LABEL            MOUNTPOINT   SIZE MODEL
nvme0n1                                           477G Samsung SSD 960 PRO 512GB               
├─nvme0n1p9  swap                    [SWAP]       7.9G 
├─nvme0n1p7  ext4   Old_Ubuntu_16.04 /mnt/old    23.1G 
├─nvme0n1p5  ntfs                                 859M 
├─nvme0n1p3                                        16M 
├─nvme0n1p1  ntfs                                 450M 
├─nvme0n1p8  ntfs   Shared_WSL+Linux /mnt/e         9G 
├─nvme0n1p10 ext4   Ubuntu_18.04     /mnt/clone  27.2G 
├─nvme0n1p6  ext4   New_Ubuntu_16.04 /           45.1G 
├─nvme0n1p4  ntfs   NVMe_Win10       /mnt/c     363.2G 
└─nvme0n1p2  vfat                    /boot/efi     99M 
sr0                                              1024M DVD+/-RW DW316  
sda                                             931.5G HGST HTS721010A9
├─sda4       ntfs   WINRETOOLS                    450M 
├─sda2                                            128M 
├─sda5       ntfs   Image                        11.4G 
├─sda3       ntfs   HGST_Win10       /mnt/d       919G 
└─sda1       vfat   ESP                           500M 

```

