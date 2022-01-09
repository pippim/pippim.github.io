---
layout:       post
title:        >
    Failing to boot to grub with dual boot Dell laptop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156055
type:         Answer
tags:         dual-boot grub2 uefi
created_date: 2019-07-05 02:02:37
edit_date:    
votes:        "2 "
favorites:    
views:        "981 "
accepted:     Accepted
uploaded:     2022-01-09 09:42:38
toc:          false
navigation:   false
clipboard:    false
---

You don't have to switch to legacy mode to boot the Ubuntu Live USB. It's a hybrid `.ISO` that works in both CSM (legacy) and UEFI mode.

It's not really an "EFI" partition but rather partitions are "MBR" (Master Boot Record) or "GPT" (GUID Partition Table). Generally speaking UEFI systems use GPT partitioned disks and CSM (legacy) systems use "MBR" partitioned disks.

The old days of "MBR" only allowed 4 primary partitions which could be divided into extended logical partitions. The new days of "GPT" allow many more partitions.

The important things to remember is most people suggest AHCI instead of Intel RAID is better to install Ubuntu. Also most people suggest Secure boot should be turned off.

Finally after installing you may still need to run `boot-repair`:

- [How to make grub menu appear instead grub minimal bash-like in booting?]({% post_url /2018/2018-12-31-How-to-make-grub-menu-appear-instead-grub-minimal-bash-like-in-booting? %})
