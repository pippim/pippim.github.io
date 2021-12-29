---
layout:       post
title:        Why does a Python program I write in Windows not work in Linux?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1206912
type:         Answer
tags:         python
created_date: 2020-01-30 18:19:56
edit_date:    
votes:        2
favorites:    
views:        2,765
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

As mentioned in other answer try running in Python interpreter before compiling.

It is likely some code will have to be changed. For example if your original program contains:

``` 
INPUT_FNAME='\Documents\python_datain\today.csv

```

It would have to be change to:

``` 
INPUT_FNAME='~/Documents/python_datain/today.csv'

```

If it's low level python and does such things as moving mouse on screen, closing popup browser windows and adjusting screen brightness and color temperature many changes will be needed with added calls to `xdotool`, `xrandr` and possibly `wmctrl`.
