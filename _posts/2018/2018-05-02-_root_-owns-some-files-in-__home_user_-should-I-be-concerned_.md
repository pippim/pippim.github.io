---
layout:       post
title:        >
    `root` owns some files in `/home/user` should I be concerned?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1031303
type:         Question
tags:         package-management root home-directory dbus ownership
created_date: 2018-05-02 23:14:32
edit_date:    
votes:        "2 "
favorites:    
views:        "2,018 "
accepted:     
uploaded:     2023-09-12 14:58:05
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-02-_root_-owns-some-files-in-__home_user_-should-I-be-concerned_.md
toc:          false
navigation:   false
clipboard:    false
---

``` 
$ sudo find /home/rick -user root 
/home/rick/.dbus
/home/rick/.dbus/session-bus
/home/rick/.dbus/session-bus/d7b25a27fe064cadb75a2f2f6ca7764e-0
/home/rick/.cache/dconf
/home/rick/.aptitude/config
/home/rick/.sane
/home/rick/.sane/xsane
/home/rick/.sane/xsane/xsane.rc
/home/rick/.packages
/home/rick/.config/gedit
/home/rick/.config/gedit/accels
```

`.sane` is the Brother scanner package that had to be installed using `sudo` so I'm not concerned. `gedit` I'm not concerned about. 

What about `dbus` stuff and `.packages`? Should this be an area of concern or does everyone have that when they repeat the search command I used?
