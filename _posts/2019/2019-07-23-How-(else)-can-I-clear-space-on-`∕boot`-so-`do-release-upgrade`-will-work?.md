---
layout:       post
title:        >
    How (else) can I clear space on `∕boot` so `do-release-upgrade` will work?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160495
type:         Answer
tags:         partitioning upgrade do-release-upgrade
created_date: !!str "2019-07-23 19:21:17"
edit_date:    !!str "2019-07-24 06:57:00"
votes:        !!str "4"
favorites:    
views:        !!str "737"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

The simplest way, when you aren't booting with EFI, is to move `/boot` to `/` where you have tons of free space.

From: [Arch Linux How to move /boot to /][1]

> Boot from a live distro, mount the partition containing `/` to  
> `/mnt/main` the partition containing `/boot` to `/mnt/boot` then copy  
> `/mnt/boot` to `/mnt/main`.  
>   
> Then remove the "/boot" entry from your `/etc/fstab`, (arch-)chroot  
> into Arch & reinstall GRUB.  

Rather than removing `/boot` entry though I would comment it out with `#`.

Rather than `chroot` and reinstall GRUB, I would use [boot-repair][2].

If you do not have physical access to your server, [have a look here](https://askubuntu.com/questions/1160618/how-do-i-resize-partitions-when-i-dont-have-physical-access-to-a-remote-server)

  [1]: https://bbs.archlinux.org/viewtopic.php?id=182901
  [2]: {% post_url /2018/2018-12-31-How-to-make-grub-menu-appear-instead-grub-minimal-bash-like-in-booting? %}
