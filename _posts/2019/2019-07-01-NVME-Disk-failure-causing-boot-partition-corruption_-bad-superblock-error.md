---
layout:       post
title:        >
    NVME Disk failure causing boot partition corruption, bad-superblock error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155268
type:         Answer
tags:         boot grub2 partitioning nvme
created_date: 2019-07-01 17:34:17
edit_date:    2019-07-01 18:03:49
votes:        "2 "
favorites:    
views:        "1,898 "
accepted:     Accepted
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-01-NVME-Disk-failure-causing-boot-partition-corruption_-bad-superblock-error.md
toc:          false
navigation:   false
clipboard:    true
---

If using an older kernel a newer one ***might*** solve the problem. However in [Arch Linux Solid state drive/NVMe](https://wiki.archlinux.org/index.php/Solid_state_drive/NVMe) it says:

> ## Samsung drive errors on Linux 4.10  
>   
> On Linux 4.10, drive errors can occur and causing system instability.  
> This seems to be the result of a power saving state that the drive  
> cannot use. Adding the kernel parameter  
> `nvme_core.default_ps_max_latency_us=5500` disables the lowest power  
> saving state, preventing write errors.  

This sounds like your best first step.


----------

## Reply to comments

<!-- Language-all: lang-bash -->

My Samsung 960 Pro is similar to your Samsung 970 EVO. As a reference I'll include my own system and yours will look similar after repair:

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

