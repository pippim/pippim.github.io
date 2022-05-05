---
layout:       post
title:        >
    Wayland session on Ubuntu 18.04: why is /usr/bin/Xwayland running?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069168
type:         Answer
tags:         18.04 wayland conky
created_date: 2018-08-26 18:39:05
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "2,441 "
accepted:     Accepted
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-26-Wayland-session-on-Ubuntu-18.04_-why-is-_usr_bin_Xwayland-running_.md
toc:          false
navigation:   false
clipboard:    false
---

The best [answer comes from Wayland][1] authors:

## X Clients under Wayland (XWayland)

Wayland is a complete window system in itself, but even so, if we're migrating away from X, it makes sense to have a good backwards compatibility story. With a few changes, the Xorg server can be modified to use wayland input devices for input and forward either the root window or individual top-level windows as wayland surfaces. The server still runs the same 2D driver with the same acceleration code as it does when it runs natively. The main difference is that wayland handles presentation of the windows instead of KMS. 

[![xwayland.png][2]][2]


----------

When you boot with Wayland you still may need to access X-based applications: [Why don&#39;t gksu/gksudo or launching a graphical application with sudo work with Wayland?](Why don&#39;t gksu/gksudo or launching a graphical application with sudo work with Wayland?)

To summarize many Q&A's on running an X applicatin within Wayland you need to use:

``` 
xhost +si:localuser:root
```


  [1]: https://wayland.freedesktop.org/xserver.html
  [2]: https://i.stack.imgur.com/ynizp.png
