---
layout:       post
title:        >
    grub saved default not working in bionic
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1151306
type:         Answer
tags:         boot grub2
created_date: !!str "2019-06-15 13:30:37"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "1,454"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

You problem sounds like this one: [GRUB 2 “stuck” on particular boot option](https://superuser.com/questions/695143/grub-2-stuck-on-particular-boot-option)

The solution in answers:

> In this case the next_entry field didn't get cleared after a reboot  
> like it should have (perhaps due to some btrfs incompatibility?)  
>   
> I was successfully able to unset it like this (again, within the  
> chroot):  
>   
>     grub2-editenv /boot/grub2/grubenv unset next_entry  
>   
> After a reboot the grub menu was back to normal!  
