---
layout:       post
title:        >
    summary and restricted output from fdisk in ubuntu bionic beaver
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1079566
type:         Answer
tags:         18.04 fdisk
created_date: 2018-09-29 19:10:04
edit_date:    2018-09-29 22:51:08
votes:        "2 "
favorites:    
views:        "131 "
accepted:     Accepted
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-29-summary-and-restricted-output-from-fdisk-in-ubuntu-bionic-beaver.md
toc:          false
navigation:   false
clipboard:    true
---

I use `lsdrv` (list drive) which is an alias of `lsblk ...` setup in my `~/.bashrc` file.

{% include copyHeader.html %}
``` 
$ lsdrv
NAME         FSTYPE LABEL            MOUNTPOINT   SIZE MODEL
sr0                                              1024M DVD+/-RW DW316  
sda                                             931.5G HGST HTS721010A9
├─sda4       ntfs   WINRETOOLS                    450M 
├─sda2                                            128M 
├─sda5       ntfs   Image                        11.4G 
├─sda3       ntfs   HGST_Win10       /mnt/d       919G 
└─sda1       vfat   ESP                           500M 
nvme0n1                                           477G Samsung SSD 960 PRO 512GB            
├─nvme0n1p5  ntfs                                 858M 
├─nvme0n1p3                                        16M 
├─nvme0n1p1  ntfs                                 450M 
├─nvme0n1p8  ntfs   Shared_WSL+Linux /mnt/e         9G 
├─nvme0n1p6  ext4   New_Ubuntu_16.04 /           23.7G 
├─nvme0n1p4  ntfs   NVMe_Win10       /mnt/c     363.2G 
├─nvme0n1p10 ext4   Ubuntu_18.04     /mnt/clone  27.2G 
├─nvme0n1p2  vfat                    /boot/efi     99M 
├─nvme0n1p9  swap                    [SWAP]       7.9G 
└─nvme0n1p7  ext4   Old_Ubuntu_16.04 /mnt/old    44.6G 

```

The alias selects the important fields I want to see that fit on a regular screen without line wrapping:

``` 
$ alias lsdrv
alias lsdrv='lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL | grep -v loop'

```

