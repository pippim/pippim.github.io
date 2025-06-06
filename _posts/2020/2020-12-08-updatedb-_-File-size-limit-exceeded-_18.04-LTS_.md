---
layout:       post
title:        >
    updatedb : File size limit exceeded (18.04 LTS)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1298463
type:         Answer
tags:         locate updatedb
created_date: 2020-12-08 12:06:19
edit_date:    
votes:        "2 "
favorites:    
views:        "2,091 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-12-08-updatedb-_-File-size-limit-exceeded-_18.04-LTS_.md
toc:          false
navigation:   false
clipboard:    false
---

Your file size is limited to `2001` blocks.

As per this [tutorial][1] increase it using:

``` 
vi /etc/security/limits.conf
```

By comparison my system which is stock has:

``` 
$ ulimit -a
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 127556
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 127556
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```



  [1]: https://www.cyberciti.biz/faq/file-size-limit-exceeded-error-under-linux-and-solution/
