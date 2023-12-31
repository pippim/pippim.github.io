---
layout:       post
title:        >
    Python Tkinter - Can only unbind and rebind Button-1 once
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59481331
type:         Question
tags:         python class tkinter global-variables
created_date: 2019-12-25 19:35:11
edit_date:    
votes:        "0 "
favorites:    
views:        "375 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-25-Python-Tkinter-Can-only-unbind-and-rebind-Button-1-once.md
toc:          false
navigation:   false
clipboard:    false
---

I'm trying to deactivate button 1 linked to a parent function. I need to reassign button 1 to move an image on the canvas. All works well the first time the code is executed. The second time I'm getting this error:

``` 
Exception in Tkinter callback
Traceback (most recent call last):
  File "/usr/lib/python2.7/lib-tk/Tkinter.py", line 1540, in __call__
    return self.func(*args)
  File "./wman2", line 244, in move_window
    MoveWindow(mycanvas, _item_id, _canvas_xy, _b1_bind, popup)
  File "./wman2", line 256, in __init__
    self.canvas.unbind("<ButtonPress-1>", self.b1_bind)
  File "/usr/lib/python2.7/lib-tk/Tkinter.py", line 1102, in unbind
    self.deletecommand(funcid)
  File "/usr/lib/python2.7/lib-tk/Tkinter.py", line 450, in deletecommand
    self.tk.deletecommand(name)
TclError: can't delete Tcl command
```


## The code:

I've commented out the code that generates the error below:

``` python
def move_window ():
    global _b1_bind, popup
    ''' Can only move a window, not a monitor or entire canvas '''
    if _item_type == "Window" :
        MoveWindow(mycanvas, _item_id, _canvas_xy, _b1_bind, popup)

    else :
        display_info()

class MoveWindow:
    ''' Drag image on canvas '''

    def __init__(self, canvas, item, coords, b1_bind, func_bind):
        self._drag_data = {"x": 0, "y": 0, "item": None}
        self.item = item
        self.coords = coords
        self.canvas = canvas
        self.b1_bind = b1_bind
        self.func_bind = func_bind
#        self.canvas.unbind("<ButtonPress-1>", self.b1_bind)
        self.p_bind = self.canvas.bind("<ButtonPress-1>", \
                                       self.on_image_press, "+")
        self.r_bind = self.canvas.bind("<ButtonRelease-1>", \
                                       self.on_image_release, "+")
        self.m_bind = self.canvas.bind("<B1-Motion>", \
                                       self.on_image_motion, "+")

    def on_image_press(self, event):
        '''Begining drag of an object'''
        root.config(cursor='hand1')
        # record the item and its location
        self._drag_data["item"] = self.item
        self._drag_data["x"] = self.coords[0]
        self._drag_data["y"] = self.coords[1]
        ''' Initial call in case mouse off image '''

    def on_image_release(self, event):
        '''End drag of an object'''
        root.config(cursor='')
        self.canvas.unbind("<ButtonPress-1>", self.p_bind)
        self.canvas.unbind("<ButtonRelease-1>", self.r_bind)
        self.canvas.unbind("<B1-Motion>", self.m_bind)
#        self.b1_bind = self.canvas.bind("<Button-1>", self.func_bind, "+")

    def on_image_motion(self, event):
        '''Handle dragging of an object'''
        # compute how much the mouse has moved
        delta_x = event.x - self._drag_data["x"]
        delta_y = event.y - self._drag_data["y"]
        # move the object the appropriate amount
        self.canvas.move(self._drag_data["item"], delta_x, delta_y)
        # record the new position
        self._drag_data["x"] = event.x
        self._drag_data["y"] = event.y
```

## Further down in the code:

``` python
# attach popup to canvas
menu.bind("<FocusOut>", popup_focus_out)
_b3_bind = mycanvas.bind("<Button-3>", popup, "+")
# Button 1 conflicts with MoveWindow()
_b1_bind=None
#_b1_bind = mycanvas.bind("<Button-1>", popup, "+")
```

## Summary

The three lines I had to comment out are:

``` python
_b1_bind = mycanvas.bind("<Button-1>", popup, "+")
self.canvas.unbind("<ButtonPress-1>", self.b1_bind)
self.b1_bind = self.canvas.bind("<Button-1>", self.func_bind, "+")
```

Currently my only option is to not let the parent function use button 1 at all. I think the problem is the first time button 1 is reassigned to the parent the button ID changes and needs to be reassigned to the global variable `_b1_bind` but I'm not sure how to do that?

**Credit:** [Code][1] is from [Brian Oakley][2].


  [1]: https://stackoverflow.com/a/6789351/6929343
  [2]: https://stackoverflow.com/users/7432/bryan-oakley
