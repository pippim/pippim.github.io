---
layout:       post
title:        >
    Disk not showing data created when being used by other OS (Ubuntu 18.04 dual boot with Windows 8 )
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029826
type:         Answer
tags:         dual-boot partitioning hard-drive
created_date: 2018-04-29 19:20:09
edit_date:    
votes:        "0 "
favorites:    
views:        "854 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Disk-not-showing-data-created-when-being-used-by-other-OS-_Ubuntu-18.04-dual-boot-with-Windows-8-_.md
toc:          false
navigation:   false
clipboard:    false
---

The third partition is the right path. I set mine up as NTFS. You need to edit your file `/etc/fstab` and insert the Windows partitions with appropriate sharing access. Here is what mine looks like:

``` 
$ cat /etc/fstab
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/nvme0n1p5 during installation
UUID=113f9955-a064-4ce2-9cae-74f2a9518550 /               ext4    errors=remount-ro 0       1
# /boot/efi was on /dev/nvme0n1p2 during installation
# swap was on /dev/nvme0n1p6 during installation
UUID=b4512bc6-0ec8-4b17-9edd-88db0f031332 none            swap    sw              0       0
#UUID=D656-F2A8	/boot/efi	vfat	defaults	0	0
# Windows drives C, D & E
UUID=F03ED48E3ED44F6A /mnt/d	ntfs-3g	permissions,locale=en_US.utf8		  0	0
UUID=5CCC5867CC583E08 /mnt/c 	ntfs-3g permissions,locale=en_US.utf8,x-gvfs-show 0 	0
UUID=F2C2ACE4C2ACADF3 /mnt/e 	ntfs-3g permissions,locale=en_US.utf8,x-gvfs-show 0 	0
UUID=D656-F2A8	/boot/efi	vfat	defaults	0	0
```

Besides using `blkid` as recommended in the file above, you can use this command:

``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,UUID,MODEL
NAME        FSTYPE  LABEL                  MOUNTPOINT          SIZE UUID                                 MODEL
sda                                                          931.5G                                      HGST HTS721010A9
├─sda1      vfat    ESP                                        500M 9478-B6E2                            
├─sda2                                                         128M                                      
├─sda3      ntfs    HGST_Win10             /mnt/d              919G F03ED48E3ED44F6A                     
├─sda4      ntfs    WINRETOOLS                                 450M 221A463E1A460F6B                     
└─sda5      ntfs    Image                                     11.4G 38D4470BD446CB38                     
sdb                                                           14.4G                                      STORE N GO      
├─sdb1      ntfs    usbdata                /media/rick/usbda   6.4G 7C7138CA3671C2BF                     
├─sdb2                                                           1M                                      
├─sdb3      vfat    usbboot                                    244M 49EB-DCAA                            
├─sdb4      iso9660 Ubuntu 18.04 LTS amd64 /media/rick/Ubunt   1.4G 2018-01-21-07-51-27-00               
└─sdb5      ext4    casper-rw              /media/rick/caspe   6.4G 4c46a63f-b96c-43b0-ac19-2664474cae5d 
sr0                                                           1024M                                      DVD+/-RW DW316  
nvme0n1                                                        477G                                      Samsung SSD 960 PRO 512
├─nvme0n1p1 ntfs                                               450M 7040FA5240FA1F12                     
├─nvme0n1p2 vfat                           /boot/efi            99M D656-F2A8                            
├─nvme0n1p3                                                     16M                                      
├─nvme0n1p4 ntfs    NVMe_Win10             /mnt/c            391.2G 5CCC5867CC583E08                     
├─nvme0n1p5 ext4    NVMe_Ubuntu_16.0                          44.6G f3f8e7bc-b337-4194-88b8-3a513f6be55b 
├─nvme0n1p6 swap    Linux Swap             [SWAP]              7.9G b4512bc6-0ec8-4b17-9edd-88db0f031332 
├─nvme0n1p7 ntfs    Shared_WSL+Linux       /mnt/e                9G F2C2ACE4C2ACADF3                     
└─nvme0n1p8 ext4    Ubuntu18.04            /                  23.7G 113f9955-a064-4ce2-9cae-74f2a9518550 
```

Then update your `/etc/fstab` with the Windows drives you want auto-mounted on boot.
