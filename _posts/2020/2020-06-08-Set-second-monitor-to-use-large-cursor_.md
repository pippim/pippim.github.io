---
layout:       post
title:        >
    Set second monitor to use large cursor?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1248066
type:         Answer
tags:         multiple-monitors cursor
created_date: 2020-06-08 02:51:31
edit_date:    
votes:        "0 "
favorites:    
views:        "141 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-08-Set-second-monitor-to-use-large-cursor_.md
toc:          false
navigation:   false
clipboard:    false
---

A simple command in the terminal:

``` 
gsettings set org.gnome.settings-daemon.peripherals.mouse locate-pointer true
```

Allows you to tape the <kbd>Control</kbd> key and get a ripple effect around the mouse pointer:

[![gnome locate mouse.gif][1]][1]


  [1]: https://i.stack.imgur.com/UmFgz.gif
