---
layout:       post
title:        >
    Windows Subsystem for Linux gedit error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/978606
type:         Answer
tags:         xubuntu xfce gedit windows-subsystem-for-linux
created_date: 2017-11-21 01:51:11
edit_date:    
votes:        "4 "
favorites:    
views:        "1,215 "
accepted:     
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-11-21-Windows-Subsystem-for-Linux-gedit-error.md
toc:          false
navigation:   false
clipboard:    false
---

Similar to this thread on [Unix & Linux][1] the error is caused by "accessability warning" which is known as a bug.

The solution is to edit your `~/.bashrc` file and put in the following line(s) (the comments (beginning with `#`) are optional):

``` 
# gedit error: ** (gedit:143): WARNING **: Couldn't connect to accessibility
# bus: Failed to connect to socket /tmp/dbus-qyusGiP2Dq: Connection refused
# As per: https://unix.stackexchange.com/questions/230238/starting-x-applications-from-the-terminal-and-the-warnings-that-follow
# This also speeds up gedit load time
export NO_AT_BRIDGE=1
```

The error message will go away and `gedit` will appear to load faster (at least on an Samsung Pro 960 bench-marked at 2.2 GBps on Linux and 3.4 GBps on Windows 10).

  [1]: https://unix.stackexchange.com/questions/230238/starting-x-applications-from-the-terminal-and-the-warnings-that-follow
