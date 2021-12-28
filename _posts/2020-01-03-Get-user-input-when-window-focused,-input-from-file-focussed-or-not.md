---
layout:       post
title:        Get user input when window focused, input from file focussed or not
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59572043
type:         Question
tags:         python tkinter parallel-processing
created_date: 2020-01-03 01:11:07
edit_date:    2020-06-20 09:12:55
votes:        0
favorites:    
views:        35
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    true
---

This is sort of a multi-threading question but not really. I have a Python **Tkinter** *Toplevel* window (Python 2.7 & 3.5 tested):

[![wman remove new windows.png][1]][1]

The second button is defined as:

``` 
    btn2 = tk.Button(button_frame, text='Remove new', \
                     command=self.remove)
    btn2.pack(side=tk.LEFT)

```

Which when the button is pressed calls this function:

``` 
def remove(self):
    ''' Remove windows on monitor now that weren't there at start '''
    new_windows = []
    new_windows_cnt = 0
(... SNIP out boring stuff ...)

```

The above code works when window has focus and user clicks button. Now I'm creating this Ubuntu Unity Keyboard Custom Shortcut:

[![Ubuntu custom keyboard shortcut.png][2]][2]


<sub>Note: Shortcut doesn't appear to work but that's not a biggie</sub>


----------

# Now the parallel processing part of the question

Create a function that continuously runs when *Toplevel* window doesn't have focus:

``` 
def parallel_processing(self)
    while (not_toplevel_destroyed):
        try:
            f = open("/tmp/w")
            self.remove()
        except IOError:
            pass         # TODO: Test if IOError is even, else delete this and above
        finally:
            f.delete()

        time.sleep(.1)
```

Note: It is OK if this new function also runs when *Toplevel* window has focus in which case it will be a 1/10th second delayed accelerator key.

How do I call this new function after `btn2` is packed?

How do I kill this new function when *Toplevel* is destroyed by button 1 which contains:

``` 
btn = tk.Button(button_frame, text='Close', \
                command=self.toplevel.destroy)
btn.pack(side=tk.LEFT)

```


----------

# Solved!!!

The accepted answer below works but there were some errors in my concept draft. Here is the final code:

{% include copyHeader.html %}
``` 
import os
import time
(... SNIP ...)

        button_frame = tk.Frame(self.toplevel)
        button_frame.pack(side=tk.BOTTOM, fill=tk.BOTH, expand=True)

        btn = tk.Button(button_frame, text='Close', \
                        command=self.close_toplevel)
        btn.pack(side=tk.LEFT)

        btn2 = tk.Button(button_frame, text='Remove new', \
                         command=self.remove)
        btn2.pack(side=tk.LEFT)

        self.toplevel_active = True
        self.parallel_processing()

    def close_toplevel(self):
        self.toplevel_active = False
        time.sleep(0.2)
        self.toplevel.destroy()

    def parallel_processing(self):
        if os.path.exists("/tmp/w"):
            os.remove("/tmp/w")
            self.remove()

        if self.toplevel_active:
            root.after(100, self.parallel_processing) 

    def remove(self):
        ''' Remove windows on monitor now that weren't there at start '''
        new_windows = []
        new_windows_cnt = 0
(... SNIP ...)

```

Here is the test proof:

``` 
$ echo 1 > /tmp/w

$ ll /tmp/w
ls: cannot access '/tmp/w': No such file or directory
```

The file doesn't exist because the python program is working. The `parallel_processing(self)` function appears to add less than 1% CPU load.


  [1]: https://i.stack.imgur.com/JVWrR.png
  [2]: https://i.stack.imgur.com/y5yy0.png
