---
layout:       post
title:        >
    Is there easy and safe way to resize /boot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180692
type:         Answer
tags:         boot server resize
created_date: 2019-10-13 16:33:07
edit_date:    
votes:        "2 "
favorites:    
views:        "2,418 "
accepted:     
uploaded:     2025-01-28 05:54:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-13-Is-there-easy-and-safe-way-to-resize-_boot.md
toc:          false
navigation:   false
clipboard:    false
---

Although [edwin's answer][1] accurately describes how to [free up space on `/boot`][2] (563 up votes) it doesn't address the question of how to incorporate `/boot` into `/` to avoid micro-management of disk space.

This question is a good example with `gparted` image:

- [How to increase size of /boot partition using gparted][3]

> Please help me here. I am always getting messages saying no free space  
> available in boot partition.  

[![enter image description here][4]][4]

This is the [good answer by Pilot6][5] posted for that question:

> You need to boot from Ubuntu LiveUSB first.  
>   
> Your `sda5`, `sda6` and `sda7` partitions are inside the extended  
> `sda4` partition.  
>   
> You will need to extend `sda4`, then move `sda5` and `sda6` left, then  
> extend `sda7`.  
>   
> You will also need to re-install grub, because start sector of your  
> `/boot` partition will change. It can be done from LiveUSB by  
>   
>     sudo mount /dev/sda5 /mnt  
>     sudo mount /dev/sda7 /mnt/boot  
>     sudo chroot /mnt  
>     sudo grub-install /dev/sda  
>     exit  


  [1]: https://askubuntu.com/a/301147/307523
  [2]: https://askubuntu.com/questions/89710/how-do-i-free-up-more-space-in-boot
  [3]: https://askubuntu.com/q/671788/307523
  [4]: https://pippim.github.io/assets/img/posts/2019/TVDUg.png
  [5]: https://askubuntu.com/a/671796/307523
