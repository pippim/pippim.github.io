---
layout:       post
title:        >
    Fully Move Grub to New Partition
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1088129
type:         Answer
tags:         boot grub2 18.04
created_date: 2018-10-28 22:55:08
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "9,782 "
accepted:     
uploaded:     2022-02-04 16:45:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-28-Fully-Move-Grub-to-New-Partition.md
toc:          false
navigation:   false
clipboard:    false
---

## 256 MB for `/boot` and 200 GB for `/`

You have lots of space but `/boot` directory is "space challenged". I'd suggest moving `/boot` from `sdb5` to `/` on `sdb6`.

Your current plan of moving `/boot` to new partition `sdb7` which is only 512 MB seems limited. Sometimes my `/boot` can be many GB if I'm testing out multiple kernels.

## How to move `/boot` to `/`

There is already an answer [here][1]:

Yes it is possible. Also its not easy. If you intent to move separated /boot partition and or / partition you should consider first of all changing the fstab entries. 

If you are moving the files to new partition then don't forget to use `cp -p` while copying to preserve permissions. adjust then your `/etc/fstab` to the new UUID's of partitions that you will use. YOu can get the partition uuid by running `blkid /dev/sdXn` where X is name of the drive and n number of partition. 

You can also use blkid to attach labels to your partitions and then mount via labels which is much easier read `man blkid` to learn more.

After you change the partitions and adjust /etc/fstab you should run the `update-grub` - available on Debian/Ubuntu script or `grub-mkconfig -o /boot/grub/grub.cfg` to generate a new config file and then reinstall grub into the first hdd that you bot from. `grub-install --recheck /dev/sdb`

Of course do not forget that when copiying mount a new / or /boot partition on /mnt and after copying all of the files mount them as / and /boot chroot and only then run update of the grub if you want things to be done correctly. 

  [1]: https://unix.stackexchange.com/a/385713/200094
