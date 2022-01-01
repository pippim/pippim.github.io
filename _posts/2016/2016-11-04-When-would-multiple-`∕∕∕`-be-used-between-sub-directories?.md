---
layout:       post
title:        >
    When would multiple `∕∕∕` be used between sub-directories?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/845338
type:         Question
tags:         command-line syntax directory-structure
created_date: !!str "2016-11-04 04:05:41"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "34"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

I was digging through `/var/log/plymouth-debug.log` and spotted this line:

``` 
[main.c:716] get_cache_file_for_mode:returning cache file '/var/lib/plymouth//boot-duration'

```

I thought it was a typo so typed the following and sure enough you can have as many `///` between sub-directories and file name as you want. For example:

``` 
rick@dell:~$ ls -la /var/lib/plymouth/boot-duration
-rw-r--r-- 1 root root 2041 Nov  3 21:39 /var/lib/plymouth/boot-duration
────────────────────────────────────────────────────────────────
rick@dell:~$ ls -la /var/lib/plymouth/////boot-duration
-rw-r--r-- 1 root root 2041 Nov  3 21:39 /var/lib/plymouth/////boot-duration
────────────────────────────────────────────────────────────────
rick@dell:~$ ls -la /var/lib//plymouth///boot-duration
-rw-r--r-- 1 root root 2041 Nov  3 21:39 /var/lib//plymouth///boot-duration

```

Under what circumstances would you want to use two or more `//` instead of a single `/` separator?
