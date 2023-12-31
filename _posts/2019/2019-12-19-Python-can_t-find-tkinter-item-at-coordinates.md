---
layout:       post
title:        >
    Python can't find tkinter item at coordinates
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59402145
type:         Question
tags:         python tkinter mouse-coordinates
created_date: 2019-12-19 01:20:10
edit_date:    2019-12-19 12:52:15
votes:        "0 "
favorites:    
views:        "958 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-19-Python-can_t-find-tkinter-item-at-coordinates.md
toc:          false
navigation:   false
clipboard:    false
---

I have this code:



``` python
for item in items:
    print ( "Item: ", item, mycanvas.coords (item) )

print ("Item at 26.0, 188.0 ", mycanvas.find_closest(26.0, 188.0))
print ("Item at 998.0, 594.0 ", mycanvas.find_closest(998.0, 594.0))
```

When I run it I get:

``` python
('Item: ', 1, [985.0, 565.0])
('Item: ', 8, [25.0, 25.0])
('Item: ', 15, [505.0, 25.0])
('Item: ', 28, [1362.0, 31.0])
('Item: ', 35, [1020.0, 119.0])
('Item: ', 42, [1050.0, 583.0])
('Item: ', 49, [25.0, 25.0])
('Item: ', 56, [26.0, 188.0])
('Item: ', 63, [998.0, 594.0])
('Item: ', 70, [1152.0, 38.0])
('Item at 26.0, 188.0 ', (57,))
('Item at 998.0, 594.0 ', (64,))
```

The last two lines should read items `56` and `63` found, respectively.

I have 10 images on the screen and am trying to find out which one is being clicked on.  To make matters worse X, Y coordinates are being passed for the screen position and not the canvas position and I'll have to figure out how to convert:

``` python
def popup(event):
    x = mycanvas.canvasx(event.x_root)
    y = mycanvas.canvasy(event.y_root)
    print( "Adjusted x, y: ", x, y )
    FoundItem=mycanvas.find_closest(x, y)
    print( "Found Item @ x, y: ", FoundItem, event.x_root, event.y_root )
    FoundTuple=mycanvas.find_overlapping(x, y, x+1, y+1)
    print( "Found Tuple: ", FoundTuple )
    # use coordinates relative to the canvas
#    ItemNdx=items.index(FoundItem)
#    print( "ItemNdx: ", ItemNdx )
    menu.tk_popup(event.x_root, event.y_root)
```

In Python's Tkinter what's the easiest way to find out which image (item/ tag ID) a user has clicked on?


----------

## Monitor image with Window Images

To give an idea of what the canvas looks like:

[![wman2 edp-1-1.png][1]][1]

This is the portion for one of the three monitors eDP-1-1. Giving worst case scenario there are four windows open:

- `gedit` with this source code in question open on bottom.
- Firefox browser with this Q&A open above that.
- Nautilus windows above that.
- Gnome-terminal on the top.

Window stacking order isn't perfect yet because `wmctrl` is used to get all open windows on desktop without any sorting by stacking order yet.

So the user would click closest to the top left corner of the image they want to select. User could also click empty monitor area not covered by a window to select the monitor image.
- Firefox browser with this website

## Tag current is also one off

I put in this code:

``` python
tag_current=event.widget.find_withtag("current")
print ("tag_current: ", tag_current)
```

And the results were this:

``` python
('Item: ', 1, [985.0, 565.0])
('Item: ', 8, [25.0, 25.0])
('Item: ', 15, [505.0, 25.0])
('Item: ', 28, [1362.0, 31.0])
('Item: ', 35, [949.0, 167.0])
('Item: ', 42, [1050.0, 583.0])
('Item: ', 49, [83.0, 52.0])
('Item: ', 56, [26.0, 188.0])
('Item: ', 63, [998.0, 594.0])
('Item: ', 70, [25.0, 25.0])
('Item: ', 77, [1091.0, 644.0])
('Item at 26.0, 188.0 ', (70,))
('Item at 998.0, 594.0 ', (64,))
('tag_current: ', (41,))
```

`tag_current` should be `42` but is being reported as `41`.

Much the same problem where `63` is reported as `64` and `56` is being reported as `70` (previously reported as `57` last time job was run).


----------


## 12 hour update

12 hours later and I'm getting closer. It is necessary to convert from Window coordinates (entire desktop of three monitors) to canvas coordinates (one Python program on one of the monitors):
``` python
def popup(event):
    global FoundItem, MouseXY
    x = mycanvas.canvasx(event.x)
    y = mycanvas.canvasy(event.y)
    MouseXY=(x, y)
    print( "Adjusted x, y: ", x, y )
    FoundItem=mycanvas.find_closest(x, y)
```

Hopefully by tonight problem will be solved...


  [1]: https://i.stack.imgur.com/ol11B.png
