---
layout:       post
title:        >
    How to detect in runtime is KASLR enabled or disabled?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1020911
type:         Answer
tags:         command-line kernel
created_date: !!str "2018-03-31 20:38:26"
edit_date:    !!str "2021-09-12 07:15:57"
votes:        !!str "3"
favorites:    
views:        !!str "8,780"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

To answer the question:

``` 
$ cat /proc/cmdline
BOOT_IMAGE=/boot/vmlinuz-4.14.27-041427-generic root=UUID=f3f8e7bc-b337-4194-88b8-3a513f6be55b ro quiet splash loglevel=0 vga=current udev.log-priority=3 fastboot kaslr acpiphp.disable=1 crashkernel=384M-2G:128M,2G-:256M vt.handoff=7

```
