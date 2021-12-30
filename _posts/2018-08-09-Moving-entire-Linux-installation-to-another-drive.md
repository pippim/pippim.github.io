---
layout:       post
title:        Moving entire Linux installation to another drive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064000
type:         Answer
tags:         backup dd grub
created_date: 2018-08-09 23:26:25
edit_date:    
votes:        7
favorites:    
views:        224,189
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

Unlike the other answers this allows you to clone the Linux installation and have it added to Grub menu with your current installations intact. Additionally it automatically modifies `/etc/fstab` for you and updates `grub` boot menu.

A menu is provided to help you select the correct partition to clone to. The clone from partition is your current booted partition.

`rsync` is used for optimal speed should you choose to reclone the partition. This is beneficial if upgrade fails, you wait for bug fix and want to run upgrade again. Similarly you may have chosen wrong options during upgrade and want to do it again.

The full script can be found here: https://askubuntu.com/questions/1028604/bash-script-to-clone-ubuntu-to-new-partition-for-testing-18-04-lts-upgrade/1028605#1028605 and this is what the screen looks like:

[![clone-ubuntu.png][1]][1]

  [1]: https://i.stack.imgur.com/MgM3p.png
