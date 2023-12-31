---
layout:       post
title:        >
    Difference in file count (Linux and Windows)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029822
type:         Answer
tags:         files
created_date: 2018-04-29 19:09:05
edit_date:    2018-04-30 22:53:35
votes:        "1 "
favorites:    
views:        "464 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Difference-in-file-count-_Linux-and-Windows_.md
toc:          false
navigation:   false
clipboard:    false
---

Windows cannot see the Ubuntu files, so you are getting count of Windows files **only**.

Ubuntu can see Windows, so you are getting file count of Windows **plus** Ubuntu.

Note that within Ubuntu you can get different file counts using different commands. For example:

``` 
rick@alien:~$ ls /mnt
c  d  e
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ locate * | wc -l
861646
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ find / * 2>/dev/null | wc -l
1262530
```

- Notice there are three Windows NTFS partitions that Ubuntu *"sees"*.
- The `locate` command only counts 861,646 files. It excludes Ubuntu system files and `/tmp` directory files. It includes Windows though.
- The `find` command counts 1,262,530 files and directories. It is also includes Windows plus Ubuntu system files and the `/tmp` directory files.
