---
layout:       post
title:        >
    What is the Window Title Bar height in Pixel?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1197504
type:         Answer
tags:         19.10
created_date: 2019-12-20 12:03:51
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "564 "
accepted:     
uploaded:     2022-04-24 19:32:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-20-What-is-the-Window-Title-Bar-height-in-Pixel_.md
toc:          false
navigation:   false
clipboard:    false
---

From [What causes the deviation in the wmctrl window move command](What causes the deviation in the wmctrl window move command)



``` bash
$ xprop | grep FRAME
_NET_FRAME_EXTENTS(CARDINAL) = 0, 0, 28, 0
```

Whenever you get a windows position and move it to that same position it shouldn't move on the screen but it does due to the height of the title bar. So in my case I would need to subtract 28 from the y-coordinate and move to that spot.


----------

# Improving performance

You will find the command takes about 10 seconds to run:

``` bash
$ time xprop | grep FRAME
_NET_FRAME_EXTENTS(CARDINAL) = 0, 0, 28, 0

real    0m9.989s
user    0m0.017s
sys     0m0.004s
```

This is extraordinary slow. To speed up the search pass a Window ID:

``` bash
$ time xprop -id $(xdotool getactivewindow) | grep FRAME
_NET_FRAME_EXTENTS(CARDINAL) = 0, 0, 28, 0

real    0m0.012s
user    0m0.011s
sys     0m0.003s

```

Now it's only a hundredth of a second, faster than a blinking eye.
