---
layout:       post
title:        >
    Formatting Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1081484
type:         Answer
tags:         18.04
created_date: 2018-10-06 16:40:44
edit_date:    
votes:        "4 "
favorites:    
views:        "9,213 "
accepted:     
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-06-Formatting-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

You may not have to reinstall. First thing is to ascertain what you did to your bash and if it was system wide or just for your user ID.

Create a new user ID and see if it works normally. If so there is no damage done to 18.04 just for your old user ID.

Ubuntu keeps a "skeleton" of most configurations that get copied to when a new user ID is created. For `.bashrc` it is in `/etc/skel/.bashrc`:

``` 
$ llocate .bashrc
ACCESS      OWNER  GROUP  SIZE  MODIFIED      NAME (updatdb last ran: 2018-10-06 10:30:06)
-rw-r--r--  root   root   2188  Aug 31  2015  /etc/bash.bashrc
-rw-r--r--  root   root   3771  Aug 31  2015  /etc/skel/.bashrc
-rw-r--r--  rick   rick   7522  Sep 30 10:10  /home/rick/.bashrc
-rw-r--r--  rick   rick   7492  Sep 30 10:09  /home/rick/.bashrc~
```

**If** you modified `.bashrc` and damaged it there **may** be a backup called `.bashrc~` which you can copy over top.
