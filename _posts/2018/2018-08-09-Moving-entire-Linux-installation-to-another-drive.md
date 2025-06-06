---
layout:       post
title:        >
    Moving entire Linux installation to another drive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064000
type:         Answer
tags:         backup dd grub
created_date: 2018-08-09 23:26:25
edit_date:    
votes:        "9 "
favorites:    
views:        "373,662 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-09-Moving-entire-Linux-installation-to-another-drive.md
toc:          false
navigation:   false
clipboard:    false
---

Unlike the other answers this allows you to clone the Linux installation and have it added to Grub menu with your current installations intact. Additionally it automatically modifies `/etc/fstab` for you and updates `grub` boot menu.

A menu is provided to help you select the correct partition to clone to. The clone from partition is your current booted partition.

`rsync` is used for optimal speed should you choose to reclone the partition. This is beneficial if upgrade fails, you wait for bug fix and want to run upgrade again. Similarly you may have chosen wrong options during upgrade and want to do it again.

The full script can be found here: [Backup/clone live to a new partition which can be booted]({% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %})5 and this is what the screen looks like:

[![clone-ubuntu.png][1]][1]

  [1]: https://pippim.github.io/assets/img/posts/2018/MgM3p.png
