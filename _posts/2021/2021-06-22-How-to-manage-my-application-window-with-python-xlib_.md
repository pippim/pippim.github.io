---
layout:       post
title:        >
    How to manage my application window with python-xlib?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/68076159
type:         Answer
tags:         python linux window x11 xlib
created_date: 2021-06-22 00:33:53
edit_date:    
votes:        "1 "
favorites:    
views:        "3,346 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-06-22-How-to-manage-my-application-window-with-python-xlib_.md
toc:          false
navigation:   false
clipboard:    false
---

Just discovered this yesterday and I think it's awesome compared to using variety of `xdotool`, `wmctrl`, `gtk` and `tkinter` to move windows around:

``` 
def x11_move_window(window_id_dec, x, y, width, height):
    """ Use x11 library to move window From:
        https://gist.github.com/chipolux/13963019c6ca4a2fed348a36c17e1277
    """

    import Xlib.display

    d = Xlib.display.Display()
    window = d.create_resource_object('window', window_id_dec)
    window.configure(x=x, y=y, width=width, height=height, border_width=0,
                     stack_mode=Xlib.X.Above)
    d.sync()
```


Note if you used `wmctrl` to get your window ID you need to convert it from hexadecimal to decimal before calling `x11_move_window`:

``` 
    window_id_hex = \
        os.popen('wmctrl -l | grep gone_fishing.png').read().strip().split()[0]

    window_id_dec = int(window_id_hex, 16)
```

``` 

```
