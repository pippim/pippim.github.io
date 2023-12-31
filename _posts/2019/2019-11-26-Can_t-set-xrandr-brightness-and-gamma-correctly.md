---
layout:       post
title:        >
    Can't set xrandr brightness and gamma correctly
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/554172
type:         Answer
tags:         xrandr monitors brightness
created_date: 2019-11-26 03:56:29
edit_date:    
votes:        "0 "
favorites:    
views:        "2,251 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-26-Can_t-set-xrandr-brightness-and-gamma-correctly.md
toc:          false
navigation:   false
clipboard:    false
---

This bug report filed in 2017 links to 2010 first report:

- [“xrandr --gamma” sets inverted values and therefore disagrees with output of “xrandr --verbose”][1]

The good news is the bug was fixed in August 2019. The bad news is the fix in version 1.5.1 hasn't made it into Ubuntu yet which (on my system at least) is still on version 1.5.0.

The work around I've used is to set gamma to the value you want. Read back the gamma setting which is inverted and then set gamma to those values. After the bug is fixed your work around still works but is unnecessary as it is setting the same values twice for R-G-B.


  [1]: https://gitlab.freedesktop.org/xorg/app/xrandr/issues/33
