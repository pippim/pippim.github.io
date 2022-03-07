---
layout:       post
title:        >
    How to consult FAT32 cluster size on Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1231102
type:         Answer
tags:         format sd-card fat32
created_date: 2020-04-25 22:52:55
edit_date:    2020-04-25 23:29:42
votes:        "4 "
favorites:    
views:        "3,320 "
accepted:     Accepted
uploaded:     2022-03-06 19:51:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-04-25-How-to-consult-FAT32-cluster-size-on-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

Simply use the `ll` command and the [size of directories][1] will be your block size (cluster size in Windows speak):

``` 
$ ll /
total 40972
drwxr-xr-x  25 root root     4096 Apr  8 16:30 ./
drwxr-xr-x  25 root root     4096 Apr  8 16:30 ../
drwxr-xr-x   2 root root     4096 Mar 31 16:44 bin/
drwxr-xr-x   4 root root     4096 Apr  8 16:32 boot/
drwxrwxr-x   2 root root     4096 Aug  2  2018 cdrom/
```

My block size is 4,096 (4K) which is normal for an `ext4` Linux file system. In your case it will be 64K and even a file of 1 byte will take 64K bytes on disk.

  [1]: https://unix.stackexchange.com/questions/234065/why-size-reporting-for-directories-is-different-than-other-files
