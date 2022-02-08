---
layout:       post
title:        >
    Getting error code(1) when installing MSSQL server in Ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/850700
type:         Answer
tags:         16.04 server mssql
created_date: 2016-11-18 03:27:18
edit_date:    2016-11-18 03:39:45
votes:        "2 "
favorites:    
views:        "4,667 "
accepted:     Accepted
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-18-Getting-error-code_1_-when-installing-MSSQL-server-in-Ubuntu-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

When Microsoft Structured Query Language (SQL) says it needs 3.25 GB of free memory it is talking about RAM (Random Access Memory) or volatile memory.

When you say you have 283.4 GB of memory free you are talking about non-volatile memory aka Hard Disk storage or Solid State Disk (SSD) storage.

Although they are both "memory" you are comparing apples to oranges which are both "fruit".

To see how much RAM you have available use the command `free` from the Terminal. ie:

``` 
$ free
              total        used        free      shared  buff/cache   available
Mem:        8031732     1614708     4377704      750208     2039320     5357500
Swap:       8191996           0     8191996
```

The first row "Mem:" refers to RAM. The second row "Swap" refers to hard disk swap space which we'll call "backup RAM" for lack of a better term.

The first column is your total installed RAM / Swap (in this case 8 GB each), the second how much is used and the third how much is "free". In this case 4 GB of RAM is free and 8 GB of Swap is free.

To increase your free RAM you can close your web browser, music players, videos, etc.

