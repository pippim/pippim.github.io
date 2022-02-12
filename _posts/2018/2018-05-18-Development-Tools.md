---
layout:       post
title:        >
    Development Tools
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037624
type:         Answer
tags:         18.04 gcc make yad
created_date: 2018-05-18 02:50:04
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "54,070 "
accepted:     
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-18-Development-Tools.md
toc:          false
navigation:   false
clipboard:    false
---

## DKMS installs `gcc` and `make` automatically

`DKMS` (Dynamic Kernel Module Support) automatically installs `gcc` and `make` in order to compile kernel modules from manufacturer's source code. It's often necessary to compile source for some WiFi Drivers, Graphics cards, etc.

``` 
$ gcc --version
gcc (Ubuntu 5.4.0-6ubuntu1~16.04.9) 5.4.0 20160609
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

$ g++ --version
g++ (Ubuntu 5.4.0-6ubuntu1~16.04.9) 5.4.0 20160609
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

$ make --version
GNU Make 4.1
Built for x86_64-pc-linux-gnu
Copyright (C) 1988-2014 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

You are definitely correct that `git` is not installed by default however I don't consider it a programming language, more of a library system.


----------

## Development Tools included by default

The preferred (IMO) methods of development within the Ubuntu family is using interpretive languages like Bash, Python and Perl. These are all installed by default. With additional GUI interfaces such as `dialog`, `zenity` and `yad` (this one requires manual installation), there is more than enough development tools to keep people busy learning and experimenting.





