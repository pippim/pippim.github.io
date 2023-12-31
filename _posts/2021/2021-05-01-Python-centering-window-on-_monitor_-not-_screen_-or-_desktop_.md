---
layout:       post
title:        >
    Python centering window on "monitor" not "screen" or "desktop"
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67351808
type:         Question
tags:         python screen desktop monitor
created_date: 2021-05-01 23:46:20
edit_date:    
votes:        "1 "
favorites:    
views:        "545 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-01-Python-centering-window-on-_monitor_-not-_screen_-or-_desktop_.md
toc:          false
navigation:   false
clipboard:    false
---

There are many questions on how to center a python tkinter window on the screen and the answer works well. My problem is my so-called "screen" looks like this:

[![mmm multiple monitors.png][1]][1]

Although you can move windows partially (or entirely) to the grey areas they won't actually show up on any of my three monitors. Top left monitor is 1920x1080, top right monitor is 3840x2160 and bottom right monitor is 1920x1080.

A program can be started via desktop icon which could be on any monitor or via `gnome-terminal` which could be on any monitor. How does one discover:

- Which monitor was active when python was invoked?
- Coordinates of active monitor within the screen real estate?

Although I'm using Gnome Desktop I'd like support for all Linux flavors using X11 or Wayland. Additionally I tried out ChromeOS Linux Beta lately and support for it would also be nice. Furthermore support for Windows and OSX is highly desired.

I've already installed and used many tools `gi`, `wnck`, `xdotool`, `wmctrl` that hem me into a corner. I'm hoping their is a popular python library (preferably installed via `apt-get` and not `pip` or `pip3`) that can expose "screen", "desktop" and "monitors" to python.

  [1]: https://i.stack.imgur.com/eQWWr.png
