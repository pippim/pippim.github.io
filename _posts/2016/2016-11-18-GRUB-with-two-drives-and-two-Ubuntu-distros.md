---
layout:       post
title:        >
    GRUB with two drives and two Ubuntu distros
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/850661
type:         Answer
tags:         boot grub2 hard-drive
created_date: 2016-11-18 00:12:26
edit_date:    
votes:        "4 "
favorites:    
views:        "1,687 "
accepted:     
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-18-GRUB-with-two-drives-and-two-Ubuntu-distros.md
toc:          false
navigation:   false
clipboard:    false
---

You can have two bootable drives and use your BIOS to select which drive to boot from but it is easier just to let Grub handle everything.

If you want grub to select the distro for you:

 - Leave your 160 GB as the first drive
 - Install you 80 GB as the second drive
 - Boot from Live DVD / Live USB and install Ubuntu to the second drive

Although you can remove the 160 GB drive, swap in the 80 GB, install Ubuntu, swap out the 80 GB, swap in the 160 GB and put the 80 GB into second drive bay that would be the last resort if Ubuntu had problems installing to the second drive.

Things to keep in mind when updating grub:

 - When you are operating on the first drive use `sudo update-grub`
 - When you are operating on the second drive use `sudo grub-install
   /dev/sda`

The first option on grub menu will be first drive (Mint) or second drive (Mate) depending on which drive grub update/install was last run on. The other distribution will be in the `advanced options` menu.

Understand this answer is typed from memory as it is impractical to take my laptop apart to swap drives around and repeat my installations. If you encounter any difficulties, no matter how small, don't hesitate to post a comment below.
