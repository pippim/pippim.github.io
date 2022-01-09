---
layout:       post
title:        >
    Do I need to remove Grub when converting from Ubuntu server to desktop?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/854716
type:         Answer
tags:         16.04 server grub2 system-installation
created_date: 2016-11-28 22:35:37
edit_date:    
votes:        "2 "
favorites:    
views:        "62 "
accepted:     
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

Assuming you are using legacy BIOS, the Grub boot strap loader resides in the first 512 bytes (bytes, not megabytes or gigabytes) of `sda` (usually).

The first 512 bytes on the drive is called the Master Boot Record (MBR) but grub also reads `initrd.img` (about 50 Megabytes) from `/boot` directory of `sda` (usually).

Grub is agnostic and doesn't care if your `/boot` directory was setup by  Ubuntu 12, 14, 16, generic, low-latency or server.

Currently your Ubuntu Server sets up `/boot` directory for grub. After installing Ubuntu Desktop it will setup the `/boot` directory for grub. Both versions of Ubuntu understand what grub needs to see and sets up the boot strap loader and `/boot` directory accordingly.

Both Server and Desktop versions contain the same grub code embedded within. They both use the `sudo update-grub` command to setup your grub menu. Both use the same `sudo update-initramfs -u` command to create a new grub `initrd.img` file whenever you make changes to plymouth, lvm, init-top hooks, etc.

Windows of course is a different beast which is why you must always install Windows first and Ubuntu second.
