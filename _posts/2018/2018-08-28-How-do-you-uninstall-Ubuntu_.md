---
layout:       post
title:        >
    How do you uninstall Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069948
type:         Answer
tags:         uninstall drive
created_date: 2018-08-28 23:49:08
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "105 "
accepted:     Accepted
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-28-How-do-you-uninstall-Ubuntu_.md
toc:          false
navigation:   false
clipboard:    true
---

# Don't Uninstall, reformat the partition

Firstly you don't "uninstall" Ubuntu 16.10 or Kali-Linux, you simply reformat the partition they are sitting in. Most people would probably use NTFS (Windows format) but you can use `ext4` for Linux if you like.

NTFS has the advantage as it can be written to and read by both Windows and Linux. `ext4` can only be read and written by Linux unless extraordinary steps are taken in Windows with the possibility of data corruption.

You can reformat the partitions in `gparted` or a number of other programs.

# Finding what the partitions are

There are a few ways of discovering the correct partitions to reformat. 

## Using `lsblk` to reveal partition device name

If when you installed Ubuntu 16.10 and Kali Linux you gave the partitions a label they would be revealed with the `lsblk` command:

{% include copyHeader.html %}
``` 
$ lsblk -o NAME,FSTYPE,LABEL,MOUNTPOINT,SIZE,MODEL
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

Imagine I wanted to reformat the partitions **Ubuntu 18.04** and **Old_Ubuntu_16.04** I would reference them as `/dev/nvme0n1p10` and `/dev/nvme0n1p7` within `gparted` or any other partition formatting program. Of course they would likely display the LABEL as well so using `lsblk` might be unnecessary.

## Mount the partition and read `/etc/lsb-release`

From your terminal (of your currently booted Ubuntu) type:

``` 
$ cat /etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.5 LTS"
```

We can repeat this command (with minor modification) on every partition after mounting it.

### Mount partition

Some people probably find it very easy to mount partitions but I wrote a script for it. I run `sudo mount-menu.sh` and get this selection screen:

[![enter image description here][1]][1]

Your Ubuntu 16.10 and Kali partitions will probably be `FSTYPE` of `ext4`. They will definitely not be `ntfs` or `vfat`. For this example I'll pick `nvme0n1p10` to see what distribution is installed there (yes we can already guess it is Ubuntu 18.04).

Use the Down Arrow key to highlight it and press <kbd>Enter</kbd>. The menu will clear and you are left with a message in your terminal:

``` 
=====================================================================
Mount Device:  /dev/nvme0n1p10
Mount Name:    /mnt/mount-menu.jcXDv
File System:   ext4
ID:            Ubuntu
RELEASE:       16.04
CODENAME:      xenial
DESCRIPTION:   Ubuntu 16.04.5 LTS
 Size  Used Avail Use%
  27G  9.4G   16G  38%
```

### Mounted partition's `/etc/lsb-release`

Now we can repeat the command from the last section with a minor modification:

``` 
$ cat /mnt/mount-menu.jcXDv/etc/lsb-release
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=16.04
DISTRIB_CODENAME=xenial
DISTRIB_DESCRIPTION="Ubuntu 16.04.5 LTS"
```

Yes I know it looks wrong but I cloned my Ubuntu 16.04 over to the 18.04 partition recently to test Ubuntu's 16.04 to 18.04 upgrade process (it's a hobby of mine).

### Unmount the partition

The next step is to unmount the partition. I also wrote a script to do that `sudo umount-menu.sh`:

[![umount-menu.sh][2]][2]

Highlight the partition you mounted in the last step and press <kbd>Enter</kbd>.

The menu will clear and a message will be display:

``` 
=====================================================================

/dev/nvme0n1p10 mounted on /mnt/mount-menu.jcXDv unmounted.
## ```




You can find both scripts here: [Unable to read files between two distros]({% post_url /2018/2018-05-11-Unable-to-read-files-between-two-distros %})




  [1]: https://i.stack.imgur.com/ybyzu.png
  [2]: https://i.stack.imgur.com/1QUhF.png

