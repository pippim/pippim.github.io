---
layout:       post
title:        >
    I've deleted all initramfs files (like an idiot) How to restore them?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1312597
type:         Answer
tags:         boot kernel initramfs grub
created_date: 2021-02-01 03:25:48
edit_date:    
votes:        "2 "
favorites:    
views:        "2,806 "
accepted:     Accepted
uploaded:     2025-03-13 15:35:00
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-02-01-I_ve-deleted-all-initramfs-files-_like-an-idiot_-How-to-restore-them_.md
toc:          false
navigation:   false
clipboard:    false
---

This [tutorial][1] will walk you through rebuilding. To summarize the steps in the tutorial:

1. Boot your machine with a Live Media
2. Open a terminal console and get partitions path
3. Mount the filesystems
4. Chroot /mnt and creating a Backup of the initrd image
5. Building Initrd Image
6. Finalizing Grub Loader and unmounting

Note because you have other partitions you can boot with you can likely skip step 1.

  [1]: https://linoxide.com/linux-how-to/fixing-broken-initrd-image-linux/
