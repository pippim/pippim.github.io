---
layout:       post
title:        >
    (SOLVED) Dual-boot: (Windows 10, Ubuntu 18.04) Can't see files from other OS in shared NTFS partition
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1142728
type:         Answer
tags:         dual-boot 18.04 partitioning windows-10 shared-folders
created_date: 2019-05-12 22:49:59
edit_date:    
votes:        "0 "
favorites:    
views:        "6,929 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-12-_SOLVED_-Dual-boot_-_Windows-10_-Ubuntu-18.04_-Can_t-see-files-from-other-OS-in-shared-NTFS-partition.md
toc:          false
navigation:   false
clipboard:    false
---

## List your current setup

Your setup is similar to mine:

``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL |egrep -v "^loop"

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

Notice the Ubuntu+Windows 10 shared partition:

``` 
nvme0n1p8  ntfs   Shared_WSL+Linux /mnt/e         9G 
```


----------

## Get your UUID

To get your UUID use:

``` 
$ lsblk -o NAME,LABEL,TYPE,UUID |egrep -v "^loop"

NAME         LABEL            TYPE UUID
nvme0n1                       disk 
├─nvme0n1p9                   part b4512bc6-0ec8-4b17-9edd-88db0f031332
├─nvme0n1p7  Old_Ubuntu_16.04 part f3f8e7bc-b337-4194-88b8-3a513f6be55b
├─nvme0n1p5                   part C0C65F23C65F18CC
├─nvme0n1p3                   part 
├─nvme0n1p1                   part 7040FA5240FA1F12
├─nvme0n1p8  Shared_WSL+Linux part F2C2ACE4C2ACADF3
├─nvme0n1p10 Ubuntu_18.04     part 8337e8c8-6461-44f2-b5fe-dfd5b6b05883
├─nvme0n1p6  New_Ubuntu_16.04 part b40b3925-70ef-447f-923e-1b05467c00e7
├─nvme0n1p4  NVMe_Win10       part 5CCC5867CC583E08
└─nvme0n1p2                   part D656-F2A8
sr0                           rom  
sda                           disk 
├─sda4       WINRETOOLS       part 221A463E1A460F6B
├─sda2                        part 
├─sda5       Image            part 38D4470BD446CB38
├─sda3       HGST_Win10       part F03ED48E3ED44F6A
└─sda1       ESP              part 9478-B6E2
```

Notice my UUID, you need to get yours for your shared partition:

``` 
├─nvme0n1p8  Shared_WSL+Linux part F2C2ACE4C2ACADF3
## ```



## Change your `/etc/fstab` file in Ubuntu

Your Ubuntu+Windows 10 shared partition needs to be setup in Ubuntu's `/etc/fstab` file so it mounts properly with write permissions:

``` 
$ cat /etc/fstab
# /etc/fstab: static file system information.
# 
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
# 
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# / was on /dev/nvme0n1p6 during installation
UUID=b40b3925-70ef-447f-923e-1b05467c00e7 /               ext4    errors=remount-ro 0       1
# /boot/efi was on /dev/nvme0n1p2 during installation
UUID=D656-F2A8  /boot/efi       vfat    umask=0077      0       1
# Windows drives C, D & E
UUID=F2C2ACE4C2ACADF3 /mnt/e    ntfs-3g permissions,locale=en_US.utf8,x-gvfs-show   0 	    0
UUID=F03ED48E3ED44F6A /mnt/d	ntfs-3g	permissions,locale=en_US.utf8		        0	    0
UUID=5CCC5867CC583E08 /mnt/c 	ntfs-3g permissions,locale=en_US.utf8,x-gvfs-show   0 	    0
# Broken Ubuntu 16.04
UUID=f3f8e7bc-b337-4194-88b8-3a513f6be55b /mnt/old        ext4    x-gvfs-show       0       0
# Clone Ubuntu 18.04
UUID=8337e8c8-6461-44f2-b5fe-dfd5b6b05883 /mnt/clone      ext4    x-gvfs-show       0       0
# swap was on /dev/nvme0n1p9 during installation
UUID=b4512bc6-0ec8-4b17-9edd-88db0f031332 none            swap    sw                0       0
```

Notice the line:

``` 
UUID=F2C2ACE4C2ACADF3 /mnt/e    ntfs-3g permissions,locale=en_US.utf8,x-gvfs-show   0 	    0
```

- Add (or change) this entry from my UUID to your UUID
- `/mnt/e` is the artificial location given to Ubuntu when my partition is mounted. You might be more comfortable with `/mnt/d` if "D:\" is the name Windows 10 gives your shared partition.
- Copy the rest of the line as mine is and hopefully it works ok like mine does.

