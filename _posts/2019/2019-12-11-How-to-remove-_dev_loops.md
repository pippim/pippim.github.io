---
layout:       post
title:        >
    How to remove /dev/loops
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195398
type:         Answer
tags:         fdisk disk-management loop-device
created_date: 2019-12-11 11:36:12
edit_date:    2020-06-12 14:37:07
votes:        "10 "
favorites:    
views:        "21,464 "
accepted:     
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-11-How-to-remove-_dev_loops.md
toc:          false
navigation:   false
clipboard:    false
---

## Edit for `sudo fdisk -l`

The question was changed today so here is how you can remove the extra output without resorting to deleting all your snaps and being left without a calculator and what not:

``` 
sudo fdisk -l | sed -e '/Disk \/dev\/loop/,+5d'
```

As this can be hard to remember you could create an alias in your `~/.bashrc`:

``` 
alias fdsk="sudo fdisk -l | sed -e '/Disk \/dev\/loop/,+5d'"
```

Then simply type `fdsk` in the command line and enter your password when prompted.


----------


As mentioned in comments `/dev/loop99` are snap file system images described here:

- [Small snap loop devices visible in gnome-disk-utility OR what is the function of snap ubuntu-core](Small snap loop devices visible in gnome-disk-utility OR what is the function of snap ubuntu-core)

Assuming you don't want to uninstall all your snaps, your next best option is to hide them from output by appending `| grep -v ^/dev/loop`. For example:

``` 
$ df | grep -v ^/dev/loop

Filesystem      1K-blocks      Used Available Use% Mounted on
udev              3978476         0   3978476   0% /dev
tmpfs              802400      1688    800712   1% /run
/dev/nvme0n1p6   46445360  33133368  11159560  75% /
tmpfs             4011984    227448   3784536   6% /dev/shm
tmpfs                5120         4      5116   1% /run/lock
tmpfs             4011984         0   4011984   0% /sys/fs/cgroup
/dev/nvme0n1p8    9485308   1890272   7595036  20% /mnt/e
/dev/nvme0n1p10  27937812  22501880   3993732  85% /mnt/clone
/dev/nvme0n1p7   23734708  19316220   3189796  86% /mnt/old
/dev/nvme0n1p4  380829660 169799196 211030464  45% /mnt/c
/dev/nvme0n1p2      97280     33222     64058  35% /boot/efi
/dev/sda3       963668988  43929712 919739276   5% /mnt/d
tmpfs              802400        60    802340   1% /run/user/1000
```

