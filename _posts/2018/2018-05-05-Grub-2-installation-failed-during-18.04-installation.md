---
layout:       post
title:        >
    Grub 2 installation failed during 18.04 installation
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1032270
type:         Answer
tags:         dual-boot grub2 windows-10 18.04
created_date: 2018-05-05 07:30:19
edit_date:    
votes:        "0 "
favorites:    
views:        "7,520 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-05-Grub-2-installation-failed-during-18.04-installation.md
toc:          false
navigation:   false
clipboard:    false
---

The history of how you nuked 16.04 and 18.04 is only partially installed is unimportant at this stage.

You need to follow the instructions in:

- [How do I install Ubuntu alongside a pre-installed Windows with UEFI?][1]

Make notes as you go along. If you encounter a problem installing 18.04 post a new question with exact details.

You need to consider that 18.04 was just released and it might have a problem operating on your system. You may wish to install 16.04 again instead.

## Consider testing upgrade instead of deleting 16.04

If you choose to install Ubuntu 16.04 again you can still try 18.04 on a new test partition. This is better than erasing 16.04 and installing 18.04 fresh (which didn't work in your case). You can also clone your 16.04 data to a new test partition and upgrade to 18.04 on the clone:

-  [Bash script to clone Ubuntu to new partition for testing 18.04 LTS upgrade][2].

This way you can keep cloning and testing 18.04 upgrade until weeks or months have passed. Keep monitoring when Ubuntu bug fixes are released that affect your system. Then test them and other areas until you are satisfied Ubuntu 18.04 works properly for you.


  [1]: https://askubuntu.com/questions/221835/how-do-i-install-ubuntu-alongside-a-pre-installed-windows-with-uefi
  [2]: {% post_url /2018/2018-04-27-Backup_clone-live-to-a-new-partition-which-can-be-booted %}
