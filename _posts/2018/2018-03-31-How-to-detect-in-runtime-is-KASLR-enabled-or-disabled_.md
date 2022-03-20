---
layout:       post
title:        >
    How to detect in runtime is KASLR enabled or disabled?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1020911
type:         Answer
tags:         command-line kernel
created_date: 2018-03-31 20:38:26
edit_date:    2021-09-12 07:15:57
votes:        "4 "
favorites:    
views:        "9,139 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-31-How-to-detect-in-runtime-is-KASLR-enabled-or-disabled_.md
toc:          false
navigation:   false
clipboard:    false
---

To answer the question:

``` 
$ cat /proc/cmdline
BOOT_IMAGE=/boot/vmlinuz-4.14.27-041427-generic root=UUID=f3f8e7bc-b337-4194-88b8-3a513f6be55b ro quiet splash loglevel=0 vga=current udev.log-priority=3 fastboot kaslr acpiphp.disable=1 crashkernel=384M-2G:128M,2G-:256M vt.handoff=7
```
