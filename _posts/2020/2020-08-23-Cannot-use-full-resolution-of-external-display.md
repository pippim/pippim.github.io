---
layout:       post
title:        >
    Cannot use full resolution of external display
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1269346
type:         Answer
tags:         display display-resolution
created_date: 2020-08-23 01:21:03
edit_date:    
votes:        "2 "
favorites:    
views:        "1,528 "
accepted:     
uploaded:     2023-12-31 12:29:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-08-23-Cannot-use-full-resolution-of-external-display.md
toc:          false
navigation:   false
clipboard:    false
---

First you don't need to use `sudo` with `xrandr`.

Second you need to run `cvt` to get the settings to pass to `xrandr --newmode`. For example (on my 4K TV):

``` 
cvt -v 3840 2160 56

Warning: Refresh Rate is not CVT standard (50, 60, 75 or 85Hz).
# 3840x2160 55.98 Hz (CVT) hsync: 124.95 kHz; pclk: 661.75 MHz
Modeline "3840x2160_56.00"  661.75  3840 4152 4568 5296  2160 2163 2168 2232 -hsync +vsync
```
Then copy the `Modeline` output as input for `xrandr --newmode`:

``` 
$ xrandr --newmode "3840x2160_56.00"  661.75  3840 4152 4568 5296  2160 2163 2168 2232 -hsync +vsync

X Error of failed request:  BadName (named color or font does not exist)
  Major opcode of failed request:  140 (RANDR)
  Minor opcode of failed request:  16 (RRCreateMode)
  Serial number of failed request:  52
  Current serial number in output stream:  52
```

The refresh rate is too high in this case so I reduced it to 54 Hz and repeated the process.
