---
layout:       post
title:        >
    Python Tkinter Avoid using "root" name in lower level function
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59621559
type:         Question
tags:         python tkinter
created_date: !!str "2020-01-07 02:48:23"
edit_date:    !!str "2020-01-07 03:47:24"
votes:        !!str "0"
favorites:    
views:        !!str "48"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

Inspired by this 300+ vote closed Q&A: https://stackoverflow.com/questions/17466561/best-way-to-structure-a-tkinter-application, I'm looking to avoid explicitly using `root` in a function within a class. I think it should be implicitly declared through `self` or `parent` or something like that. Here is the code in question:

I have this code...

``` 
        self.label_this = tk.StringVar()
        self.label_last = tk.StringVar()
        self.label_total = tk.StringVar()

        tk.Label(count_frame, textvariable=self.label_this, \
                 font=(None, MON_FONTSIZE)).pack(anchor=tk.W)
        tk.Label(count_frame, textvariable=self.label_last, \
                 font=(None, MON_FONTSIZE)).pack(anchor=tk.W)
        tk.Label(count_frame, textvariable=self.label_total, \
                 font=(None, MON_FONTSIZE)).pack(anchor=tk.W)
        self.update_cnt_labels()

```

Then later on...

``` 
        ''' Get list of Window ID's on monitor now '''
        new_windows = self.windows_on_monitor(new_windows)
        new_windows_cnt = len(new_windows) / WIN_CNT
        if self.old_windows_cnt == new_windows_cnt :
            FlashMessage (self.label_this, "No new windows to remove...", \
                          3, 750, 250)
            self.update_cnt_labels()
            return
```

Then later on...

``` 
class FlashMessage:
    def __init__(self, widget, message, count=5, on=500, off=300):

        self.delay_show (1, widget, message)
        for i in range(count):
            self.delay_show (on, widget, "")
            self.delay_show (off, widget, message)

    def delay_show(self, ms, widget, message):
        root.after(ms, widget.set(message))
        root.update_idletasks()
```

I want to avoid using `root` in the last two lines and use `self` or something similar.

My program call chain is something like:

- the traditional: `root = tk.Tk()`
- bunch of mainline initialization stuff.
- the class: `ResizingCanvas(mycanvas)`
- mainline function: `popup(event)` which is bound to `<ButtonPress-1>`
- Dynamically formatted `menu.tk_popup(event.x_root, event.y_root)`
- the class: `RemoveNewWindows()`
- the function: `remove()`
- the class: `FlashMessage()` (show above)
- the function: `self.delay_show()` (shown above)

Each class and function has haphazard `self`, positional parameters, `*args` and `**kwargs` which mostly serve no purpose. Indeed even the `__init__` above might be unnecessary. This is a result of copying code all over stack overflow.

Every second word in the program seems to be `self` but the word `parent`  is only used in the class `ResizingCanvas()`. Do I have to propagate `parent` down the call list and use it somehow?
