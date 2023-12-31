---
layout:       post
title:        >
    brightness | xrandr | what does it mean - software only modification?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/524339
type:         Answer
tags:         xrandr backlight
created_date: 2019-06-12 00:42:39
edit_date:    
votes:        "1 "
favorites:    
views:        "1,218 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-12-brightness-_-xrandr-_-what-does-it-mean-software-only-modification_.md
toc:          false
navigation:   false
clipboard:    false
---

It means laptops with built in displays have software to control the hardware brightness. There are no little knobs you can turn on laptops.

External monitors have knobs you can turn or buttons you can press to set hardware brightness.

On a laptop you use software to control the brightness like this:

``` 
# echo 2000 > /sys/class/backlight/intel_backlight/brightness
```



