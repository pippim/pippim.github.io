---
layout:       post
title:        >
    How to obtain the correct vfat path translation for my floppies?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/924356
type:         Answer
tags:         mount filename fat32 udisks floppy
created_date: 2017-06-11 15:51:30
edit_date:    
votes:        "0 "
favorites:    
views:        "700 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-11-How-to-obtain-the-correct-vfat-path-translation-for-my-floppies_.md
toc:          false
navigation:   false
clipboard:    false
---

The `mount` command argument `-t` specifies the file system type. You are close in your usage however you need a space between the `-t` and the file system type. Change your command from:

``` 
$ sudo mount -tvfat /dev/fd0 /mnt
```

to:

``` 
$ sudo mount -t vfat /dev/fd0 /mnt
```

Sorry I don't have access to my machines with floopy drives to show what the real life output looks like.
