---
layout:       post
title:        >
    How do you set scaling for a high dpi monitor and low dpi monitor independently?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/823535
type:         Answer
tags:         unity gui display-resolution scaling 4k-monitor
created_date: 2016-09-11 04:03:18
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "57,748 "
accepted:     Accepted
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-11-How-do-you-set-scaling-for-a-high-dpi-monitor-and-low-dpi-monitor-independently_.md
toc:          false
navigation:   false
clipboard:    false
---

My monitors are only 1920x1080: a 17" laptop and a 50" TV. The smaller laptop sits four feet away and I need to increase the size of everything to see it better.

Go into **System Settings** -> **Screen Display**

On the *Scale for menus and title bar*, I set to 1.5 on 17" Laptop screen but leave at 1.0 for TV. I'm not sure if this will work for you...

[![Screen Scaling][1]][1]

# Edit 1 - Increase overall DPI scaling

The deafult DPI in X is 96 Dots per inch. This can appear very tiny on my 17" laptop screen with a resolution of 1920 x 1080. You need to stick your face 6 inches from the screen to read the screen for the `Kids3` application for example:

[![Kids3 96DPI][2]][2]

To solve this (in my case), use:

``` 
xrandr --dpi 168
```

Then reopen the application:

[![Kids3 168DPI][3]][3]

This is a manual method. You can make it permament but you can have X calculate the DPI by passing it your resolution and screen size in the Xorg configuration file:

``` 
Section "Monitor"
    Identifier             "Monitor0"
    DisplaySize             286 179    # In millimeters
EndSection
```

I haven't played with this yet.

  [1]: http://i.stack.imgur.com/Jh7ID.png
  [2]: https://i.stack.imgur.com/3hLVb.png
  [3]: https://i.stack.imgur.com/2utV8.png
