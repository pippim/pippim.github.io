---
layout:       post
title:        >
    Obtain Active window using Python
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68051174
type:         Answer
tags:         python active-window
created_date: 2021-06-19 22:19:16
edit_date:    
votes:        "1 "
favorites:    
views:        "101,193 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-06-19-Obtain-Active-window-using-Python.md
toc:          false
navigation:   false
clipboard:    false
---

In Linux under X11:

``` python
xdo_window_id = os.popen('xdotool getactivewindow').read()
print('xdo_window_id:', xdo_window_id)
```

will print the active window ID in decimal format:

``` 
xdo_window_id: 67113707
```

Note `xdotool` must be installed first:

``` 
sudo apt install xdotool
```

Note `wmctrl` uses hexadecimal format for window ID.
