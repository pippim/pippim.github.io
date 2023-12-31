---
layout:       post
title:        >
    USB boot option on Grub Customizer?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132104
type:         Answer
tags:         grub2 usb
created_date: 2019-04-08 10:44:45
edit_date:    
votes:        "0 "
favorites:    
views:        "4,973 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-08-USB-boot-option-on-Grub-Customizer_.md
toc:          false
navigation:   false
clipboard:    false
---

Read the entire post here: [GRUB2 New menu entry pointing to USB drive][1]

This is how they set it up:

> My menu entry in `40_custom`  
>   
> Code:  
>   
>     menuentry "Boot Kali Live from USB Drive"{  
>         insmod chain  
>         search --no-floppy --fs-uuid --set=root EDCE-911D  
>         chainloader ($root)/efi/boot/bootx64.efi  
>     }  

After setting up a custom entry in `/etc/grub.d/40_custom` file remember to run `sudo update-grub`.

  [1]: https://www.linuxquestions.org/questions/linux-software-2/grub2-new-menu-entry-pointing-to-usb-drive-4175582347/
