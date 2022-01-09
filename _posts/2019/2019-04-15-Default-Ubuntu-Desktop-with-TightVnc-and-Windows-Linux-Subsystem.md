---
layout:       post
title:        >
    Default Ubuntu Desktop with TightVnc and Windows Linux Subsystem
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1134063
type:         Answer
tags:         gnome vnc windows-subsystem-for-linux tightvncserver yad
created_date: 2019-04-15 11:27:40
edit_date:    
votes:        "2 "
favorites:    
views:        "7,426 "
accepted:     
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

I use [VcXsrv][1] because it's free and is frequently updated. See my answer here:

- [What&#39;s the easiest way to run GUI apps on Windows Subsystem for Linux as of 2018?](What&#39;s the easiest way to run GUI apps on Windows Subsystem for Linux as of 2018?)

The important thing is to install it accepting the defaults and then (for me) to edit `/etc/environment` and change this:

``` 
PATH="/mnt/e/bin:/mnt/e/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:"

to this:
```


``` 
PATH="/mnt/e/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
export LIBGL_ALWAYS_INDIRECT=Yes
export DISPLAY=localhost:0.0

```

- Adding `/mnt/e/bin:` at beginning of path is only important for shared scripts stored on NTFS partition that both Ubuntu natively runs and WSL Bash runs.
- export `LIBGGL...` is important for GUI to paint properly
- export `DISPLAY...` is important for X-Server to run properly
Then I can use `yad` and `zenity` for all my GUI scripts.


  [1]: https://sourceforge.net/projects/vcxsrv/
