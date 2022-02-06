---
layout:       post
title:        >
    Font size changes after running xrandr --off
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/958810
type:         Answer
tags:         display fonts monitor xrandr appearance
created_date: 2017-09-24 00:05:12
edit_date:    
votes:        "4 "
favorites:    
views:        "2,345 "
accepted:     Accepted
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-09-24-Font-size-changes-after-running-xrandr---off.md
toc:          false
navigation:   false
clipboard:    false
---

You can change the size of fonts for future windows opened by opening the terminal and using:

``` 
xrandr --dpi 96
```

For higher resolution (1920x1080) monitors try using:

``` 
xrandr --dpi 144
```

I use this on programs that do not implement HiDPI scaling themselves. Although it may not explain your problem it may solve it. Or it may not... YMMV.
