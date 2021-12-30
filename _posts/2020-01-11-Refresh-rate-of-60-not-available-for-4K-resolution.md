---
layout:       post
title:        Refresh rate of 60 not available for 4K resolution
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1202340
type:         Answer
tags:         18.04 display hdmi
created_date: 2020-01-11 21:09:00
edit_date:    
votes:        2
favorites:    
views:        6,360
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

I had the exact same problem with my 4K TV. The solution was to generate a 3840x2160 resolution with a 54 Hz refresh rate:

- https://askubuntu.com/questions/377937/how-to-set-a-custom-resolution

To summarize I used:

- `cvt 3840 2160 54`

Then take the output from above and pass it to below:

``` 
xrandr --newmode "3840x2160_54.00"  637.50  3840 4152 4568 5296  2160 2163 2168 2230 -hsync +vsync

```

Finally set the monitor to the new resolution - refresh rate:

``` 
xrandr --addmode DP-1-1 3840x2160_54.00

```

The difference between 30 Hz and 54 Hz is night and day. At 30 Hz colors are washed out and causes eye strain.
