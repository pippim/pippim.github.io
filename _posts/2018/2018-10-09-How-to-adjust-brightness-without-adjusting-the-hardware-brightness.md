---
layout:       post
title:        >
    How to adjust brightness without adjusting the hardware brightness
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1082272
type:         Answer
tags:         brightness
created_date: 2018-10-09 12:23:05
edit_date:    2018-10-09 17:35:44
votes:        "2 "
favorites:    
views:        "788 "
accepted:     
uploaded:     2026-01-11 15:29:19
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-09-How-to-adjust-brightness-without-adjusting-the-hardware-brightness.md
toc:          false
navigation:   false
clipboard:    false
---

Use:

``` 
xrandr --output <name> --brightness .75
```

Where:

- `<name>` is output name derived by using `xrandr` with no parameters.
- `.75` is brightness of 75%. Enter value with up to two decimals, ie 50.55
