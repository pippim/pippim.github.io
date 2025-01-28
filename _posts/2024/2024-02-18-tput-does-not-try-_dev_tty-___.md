---
layout:       post
title:        >
    tput does not try /dev/tty (?)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1503888
type:         Answer
tags:         command-line
created_date: 2024-02-18 00:47:04
edit_date:    
votes:        "5 "
favorites:    
views:        "854 "
accepted:     
uploaded:     2025-01-28 05:54:29
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-02-18-tput-does-not-try-_dev_tty-___.md
toc:          false
navigation:   false
clipboard:    false
---

The stated method always returns 24 x 80:

``` 
$ echo -e "lines\ncols" | tput -S >/tmp/xx 2>&1
$ cat /tmp/xx
24
80
```

To find the true height / width you can use this method:

``` 
$ stty size
30 92
```
