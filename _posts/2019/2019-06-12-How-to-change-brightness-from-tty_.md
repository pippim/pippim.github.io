---
layout:       post
title:        >
    How to change brightness from tty?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/524338
type:         Answer
tags:         tty xrandr brightness
created_date: 2019-06-12 00:34:28
edit_date:    
votes:        "1 "
favorites:    
views:        "4,232 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-12-How-to-change-brightness-from-tty_.md
toc:          false
navigation:   false
clipboard:    false
---

The command you are using:

``` 
xrandr --output HDMI1 --brightness 976
```

is telling `xrandr` to set the brightness 976 times higher than normal.

- `1.0` sets to normal brightness
- `1.1` sets 10% above normal brightness but it's not recommended to go over 1.0 as colours wash out.
- `0.75` or `.75` sets to 75% of normal brightness
- `0.66` sets to 2/3 normal brightness, etc.
