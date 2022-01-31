---
layout:       post
title:        >
    Why does Ubuntu enable TRIM for certain brands only?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1026242
type:         Answer
tags:         ssd trim
created_date: 2018-04-18 23:41:03
edit_date:    2018-04-19 10:55:10
votes:        "14 "
favorites:    
views:        "3,012 "
accepted:     
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-18-Why-does-Ubuntu-enable-TRIM-for-certain-brands-only_.md
toc:          false
navigation:   false
clipboard:    true
---

When it comes to low-level Disk I/O such as TRIM, Ubuntu doesn't have much control. It's really up to the Linux Kernel and the SSD manufacturer. Before running TRIM you have to make sure your SSD supports it or it could become an expensive paperweight.

To find out for sure use:

{% include copyHeader.html %}
``` 
$ lsblk --discard
NAME        DISC-ALN DISC-GRAN DISC-MAX DISC-ZERO
sdb                0        0B       0B         0
├─sdb4             0        0B       0B         0
├─sdb2             0        0B       0B         0
├─sdb5             0        0B       0B         0
├─sdb3             0        0B       0B         0
└─sdb1             0        0B       0B         0
sr0                0        0B       0B         0
sda                0        0B       0B         0
├─sda4             0        0B       0B         0
├─sda2             0        0B       0B         0
├─sda5             0        0B       0B         0
├─sda3             0        0B       0B         0
└─sda1             0        0B       0B         0
nvme0n1          512      512B       2T         0
├─nvme0n1p5        0      512B       2T         0
├─nvme0n1p3        0      512B       2T         0
├─nvme0n1p1        0      512B       2T         0
├─nvme0n1p6        0      512B       2T         0
├─nvme0n1p4        0      512B       2T         0
├─nvme0n1p2        0      512B       2T         0
└─nvme0n1p7        0      512B       2T         0
```

When `DISC-GRAN DISC-MAX` columns contain non-zero values it is safe to use TRIM. If you are unsure which disk is which in this display you can get the model name and number using:

{% include copyHeader.html %}
``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL
NAME        FSTYPE  LABEL                  MOUNTPOINT          SIZE MODEL
sdb                                                           14.4G STORE N GO      
├─sdb4      iso9660 Ubuntu 18.04 LTS amd64 /media/rick/Ubunt   1.4G 
├─sdb2                                                           1M 
├─sdb5      ext4    casper-rw              /media/rick/caspe   6.4G 
├─sdb3      vfat    usbboot                                    244M 
└─sdb1      ntfs    usbdata                /media/rick/usbda   6.4G 
sr0                                                           1024M DVD+/-RW DW316  
sda                                                          931.5G HGST HTS721010A9
├─sda4      ntfs    WINRETOOLS                                 450M 
├─sda2                                                         128M 
├─sda5      ntfs    Image                                     11.4G 
├─sda3      ntfs    HGST_Win10             /mnt/d              919G 
└─sda1      vfat    ESP                                        500M 
nvme0n1                                                        477G Samsung SSD 960 PRO 512G
├─nvme0n1p5 ext4    NVMe_Ubuntu_16.0       /                  44.6G 
├─nvme0n1p3                                                     16M 
├─nvme0n1p1 ntfs                                               450M 
├─nvme0n1p6 swap    Linux Swap             [SWAP]              7.9G 
├─nvme0n1p4 ntfs    NVMe_Win10             /mnt/c            414.9G 
├─nvme0n1p2 vfat                           /boot/efi            99M 
└─nvme0n1p7 ntfs    Shared_WSL+Linux       /mnt/e                9G 
```

So in this case the SSD is a **Samsung Pro 960** which does indeed support TRIM command.

For more details see this [Arch Linux article][1].


  [1]: https://wiki.archlinux.org/index.php/Solid_State_Drive
