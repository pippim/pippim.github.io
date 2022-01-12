---
layout:       post
title:        >
    Can I do a Silent or Unattended Release Upgrade?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035893
type:         Answer
tags:         upgrade release-management
created_date: 2018-05-14 00:19:42
edit_date:    
votes:        "9 "
favorites:    
views:        "34,006 "
accepted:     
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

To confirm what Thomas Ward states in his answer and contradict the accepted answer, `do-release-upgrade -d -f DistUpgradeViewNonInteractive` DOES NOT WORK.

In fact at the very first prompt it broke my 16.04 to 18.04 test partition broken and I had to reclone it. This is where the script freezes:

``` 
Setting up mount (2.31.1-0.4ubuntu3) ...
Setting up systemd (237-3ubuntu10) ...
Installing new version of config file /etc/pam.d/systemd-user ...
Installing new version of config file /etc/systemd/journald.conf ...

Configuration file '/etc/systemd/logind.conf'
 ==> Modified (by you or by a script) since installation.
 ==> Package distributor has shipped an updated version.
   What would you like to do about it ?  Your options are:
    Y or I  : install the package maintainer's version
    N or O  : keep your currently-installed version
      D     : show the differences between the versions
      Z     : start a shell to examine the situation
 The default action is to keep your current version.
*** logind.conf (Y/I/N/O/D/Z) [default=N] ? y

Y
CRASHED... NOTHING HAPPENS NOW... WILL KILL AND RESTART WITHOUT -f OPTION...

```

Due to Input Inhibitors neither reboot nor shutdown will work after killing the script. You have to do a cold shutdown (hold power button ~ 10 seconds).

Thank goodness this was a 16.04 clone upgrade and not on the real 16.04 partition.

----------


To make life even more interesting a new 898 MB partition was added to my NVMe SSD and my regular partitions shifted:

``` 
$ lsdrv
NAME        FSTYPE  LABEL                  MOUNTPOINT          SIZE MODEL

nvme0n1                                                        477G Samsung SSD 960 PRO 512G
├─nvme0n1p5 ntfs                                               858M 
├─nvme0n1p3                                                     16M 
├─nvme0n1p1 ntfs                                               450M 
├─nvme0n1p8 ntfs    Shared_WSL+Linux       /mnt/e                9G 
├─nvme0n1p6 ext4    Ubuntu18.04                               23.7G 
├─nvme0n1p4 ntfs    NVMe_Win10             /mnt/c            390.4G 
├─nvme0n1p2 vfat                           /boot/efi            99M 
├─nvme0n1p9 swap    Linux Swap             [SWAP]              7.9G 
└─nvme0n1p7 ext4    NVMe_Ubuntu_16.0       /                  44.6G 

```


- `nvme0n1p5` used to be where my Ubuntu 16.04 partition resided but now it is on `nvme0n1p7`
- `nvme0n1p8` used to be where my 18.04 test partition resided but now it is on `nvme0n1p8`

**NOTE:** I also upgraded Windows 10 from Build 1709 to Build 1803 this afternoon so it is possible that it created the new 898 MB `nvme0n1p5` partition in `ntfs` format.

