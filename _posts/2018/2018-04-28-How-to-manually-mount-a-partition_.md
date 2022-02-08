---
layout:       post
title:        >
    How to manually mount a partition?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029041
type:         Answer
tags:         mount
created_date: 2018-04-28 03:00:41
edit_date:    2020-06-12 14:37:07
votes:        "41 "
favorites:    
views:        "104,357 "
accepted:     Accepted
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-28-How-to-manually-mount-a-partition_.md
toc:          false
navigation:   false
clipboard:    true
---

The first step is to list all your partitions to find the one you want to mount:

{% include copyHeader.html %}
``` 
$ lsblk -o NAME,FSTYPE,LABEL,SIZE,MOUNTPOINT
NAME        FSTYPE  LABEL                    SIZE MOUNTPOINT
sdb                                         14.4G 
├─sdb4      iso9660 Ubuntu 18.04 LTS amd64   1.4G /media/rick/Ubuntu 18.04 LTS amd64
├─sdb2                                         1M 
├─sdb5      ext4    casper-rw                6.4G /media/rick/casper-rw
├─sdb3      vfat    usbboot                  244M 
└─sdb1      ntfs    usbdata                  6.4G /media/rick/usbdata
sr0                                         1024M 
sda                                        931.5G 
├─sda4      ntfs    WINRETOOLS               450M 
├─sda2                                       128M 
├─sda5      ntfs    Image                   11.4G 
├─sda3      ntfs    HGST_Win10               919G /mnt/d
└─sda1      vfat    ESP                      500M 
nvme0n1                                      477G 
├─nvme0n1p5 ext4    NVMe_Ubuntu_16.0        44.6G /
├─nvme0n1p3                                   16M 
├─nvme0n1p1 ntfs                             450M 
├─nvme0n1p8 ext4    Ubuntu18.04             23.7G 
├─nvme0n1p6 swap    Linux Swap               7.9G [SWAP]
├─nvme0n1p4 ntfs    NVMe_Win10             391.2G /mnt/c
├─nvme0n1p2 vfat                              99M /boot/efi
└─nvme0n1p7 ntfs    Shared_WSL+Linux           9G /mnt/e
```

For this example, we will mount `nvme0n1p8` which has the label `Ubuntu18.04`. To credit sources, we'll be following this [article][1] as a 
guide.

## Create mount point directory

The next step is to create a directory under `/mnt` that the newly mounted partition will be referred to as:

``` 
sudo mkdir /mnt/Ubuntu18.04
```

## Mount the partition to the new directory

The final step is to mount the partition to the new directory:

``` 
$ sudo mount -t auto -v /dev/nvme0n1p8 /mnt/Ubuntu18.04
/dev/nvme0n1p8 mounted on /mnt/Ubuntu18.04.
```

Notice we prepend `/dev/` to the names provided by `lsblk` above.

Now let's see what we've just mounted:

``` 
$ ll /mnt/Ubuntu18.04
total 24
drwxr-xr-x 3 root root  4096 Apr 26 17:00 ./
drwxr-xr-x 6 root root  4096 Apr 27 20:51 ../
drwx------ 2 root root 16384 Apr 26 17:00 lost+found/
```

`lost_found` is needed for `fschk` command (File System check). It is automatically created and normally we don't have to "fiddle" with it.

## Unmount the partition

When we are finished we can unmount the partition using the `-l` parameter which safely unmounts the partition:

``` 
$ sudo umount /dev/nvme0n1p8 -l
```


----------

# Script method

A script to mount partition is available in this answer:

- [Mount Debian install as USB drive](Mount Debian install as USB drive)

This screen appears tailored to your unique machine environment:

[![mount-menu 1.png][2]][2]


  [1]: https://linuxexpresso.wordpress.com/2010/03/14/mount-partitions-in-terminal-fstab/
  [2]: https://i.stack.imgur.com/VqpIG.png
