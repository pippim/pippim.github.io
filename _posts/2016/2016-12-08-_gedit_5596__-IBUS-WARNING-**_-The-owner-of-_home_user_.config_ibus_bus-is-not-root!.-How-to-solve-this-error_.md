---
layout:       post
title:        >
    (gedit:5596): IBUS-WARNING **: The owner of /home/user/.config/ibus/bus is not root!. How to solve this error?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/858606
type:         Answer
tags:         gedit
created_date: 2016-12-08 23:53:25
edit_date:    2016-12-09 11:32:21
votes:        "1 "
favorites:    
views:        "14,816 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-08-_gedit_5596__-IBUS-WARNING-**_-The-owner-of-_home_user_.config_ibus_bus-is-not-root!.-How-to-solve-this-error_.md
toc:          false
navigation:   false
clipboard:    false
---

The problem with the one answer recommending "sudo gedit" is technically incorrect. You need to use "gksu ..." for graphical environments (GUI).

``` 
gksu gedit some_file_name
```

and

``` 
gksu nautilus /some_directory
```

are the accepted standards.

Starting with **Ubuntu 17.04** you should use `pkexec` instead of `gksu`.



