---
layout:       post
title:        >
    Display plymouth on Ubuntu server 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1044144
type:         Answer
tags:         boot grub2 plymouth
created_date: 2018-06-06 12:43:19
edit_date:    2018-07-13 23:02:39
votes:        "0 "
favorites:    
views:        "663 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-06-Display-plymouth-on-Ubuntu-server-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

You are changing the compiled file rather than the source file. When `sudo update-grub` runs your changes to the compiled file are replaced by the source file.

The correct source file to edit is `/etc/default/grub`.

After saving `/etc/default/grub` changes then you need to run:

``` 
sudo update-grub
```
