---
layout:       post
title:        >
    How can I check the NVME specs
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1008891
type:         Answer
tags:         nvme
created_date: 2018-02-23 01:08:23
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "21,598 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-23-How-can-I-check-the-NVME-specs.md
toc:          false
navigation:   false
clipboard:    true
---

# lsblk (List Block)

You can use `lsblk` command:

{% include copyHeader.html %}
``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL
NAME        FSTYPE LABEL                 MOUNTPOINT     SIZE MODEL
sdb                                                   186.3G 2105            
├─sdb2      ntfs   S3A6550D005           /media/rick/ 178.9G 
├─sdb3      ntfs   HDDRECOVERY                            6G 
└─sdb1      ntfs   TOSHIBA SYSTEM VOLUME                1.5G 
sda                                                   931.5G HGST HTS721010A9
├─sda4      ntfs   WINRETOOLS                           450M 
├─sda2                                                  128M 
├─sda5      ntfs   Image                               11.4G 
├─sda3      ntfs   HGST_Win10            /mnt/d         919G 
└─sda1      vfat   ESP                                  500M 
nvme0n1                                                 477G Samsung SSD 960 PRO 512GB    
├─nvme0n1p5 ext4   NVMe_Ubuntu_16.0      /             44.6G 
├─nvme0n1p3                                              16M 
├─nvme0n1p1 ntfs                                        450M 
├─nvme0n1p6 swap   Linux Swap            [SWAP]         7.9G 
├─nvme0n1p4 ntfs   NVMe_Win10            /mnt/c       414.9G 
├─nvme0n1p2 vfat                         /boot/efi       99M 
└─nvme0n1p7 ntfs   Shared_WSL+Linux      /mnt/e           9G 
```

You can see my NVMe SSD is a **Samsung SSD 960 PRO 512GB**

# Create an `alias` for arguments

As pointed out in comments a typo was made for `MODEL` and the output was incomplete. To avoid that in the future and more importantly so you don't have to remember the arguments create an `alias` in `~/.bashrc` called `lsdrv` which you can use all the time:

``` 
$ cat ~/.bashrc | grep lsdrv
# Create lsdrv version of lsblk without UUID's
alias lsdrv="lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL"
```

Now in the terminal you can simply use `lsdrv` to see all your drives complete with model number and other useful information.

# Voltage / Power

This is pretty much irrelevant. The deciding factor is M.2 22x80 mm size or a different size. Also whether if it is Gen 3 x 2 or Gen 3 x 4 speed (the second is twice as fast). 

For example I have two M.2 SSD bays the first one supports Gen 3 x 4 speeds the second one only supports Gen 3 x 2 speeds because there are a limited number of PCIe lanes on the Skylake chipset.

There may be other issues but this is what I remember off the top of my head. You should of course do your own research.

Basically you need to know the make and model of your computer to know the make and models of the M.2 NVMe SSDs you can install in it.
