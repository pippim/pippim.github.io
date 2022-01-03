---
layout:       post
title:        >
    Python can't find tkinter item at coordinates
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59437505
type:         Answer
tags:         python tkinter mouse-coordinates
created_date: 2019-12-21 15:34:03
edit_date:    
votes:        "0 "
favorites:    
views:        "601 "
accepted:     Accepted
uploaded:     2022-01-03 08:14:44
toc:          false
navigation:   false
clipboard:    false
---

Here is the final solution to make it work:

``` 
def popup(event):
    global FoundItem
#    print( "Root x, y: ", event.x_root, event.y_root )
#    print( "event x, y: ", event.x, event.y )
    FoundItem=mycanvas.find_closest(event.x, event.y)
    menu.tk_popup(event.x_root, event.y_root)
```

You can remove the comments (`#` character) to see the `x,y` coordinates in your terminal.

- The `.tk_popup` or `.post` command expects Screen Desktop coordinates: `(event.x_root, event.y_root)`
- The `.find_closest` command expects Canvas coordinates: `(event.x, event.y)`
