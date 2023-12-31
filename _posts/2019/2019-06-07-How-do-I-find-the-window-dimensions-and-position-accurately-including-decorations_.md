---
layout:       post
title:        >
    How do I find the window dimensions and position accurately including decorations?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/523517
type:         Answer
tags:         command-line x11 window-geometry
created_date: 2019-06-07 10:59:06
edit_date:    
votes:        "0 "
favorites:    
views:        "80,807 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-07-How-do-I-find-the-window-dimensions-and-position-accurately-including-decorations_.md
toc:          false
navigation:   false
clipboard:    false
---

Combining answers on this page I used this:

``` 
$ sleep 3 && xdotool getwindowfocus getwindowgeometry

Window 88080400
  Position: 4565,2345 (screen: 0)
  Geometry: 1186x885
```

Run the one-liner and then within 3 seconds click on the window you want the position and geometry for.
