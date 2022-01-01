---
layout:       post
title:        >
    Why does child have to import same modules parent did?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63947893
type:         Question
tags:         python python-import
created_date: !!str "2020-09-18 00:48:06"
edit_date:    !!str "2020-09-18 00:51:37"
votes:        !!str "0"
favorites:    
views:        !!str "34"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    true
---

My main Python program (script to most) has elaborate import statements I'd rather not repeat in modules I import:

{% include copyHeader.html %}
``` 
from __future__ import print_function       # Must be first import
from __future__ import with_statement       # Error handling for file opens

try:
    import tkinter as tk
    import tkinter.ttk as ttk
    import tkinter.font as font
    import tkinter.filedialog as filedialog
    import tkinter.messagebox as messagebox
    PYTHON_VER="3"
except ImportError: # Python 2
    import Tkinter as tk
    import ttk
    import tkFont as font
    import tkFileDialog as filedialog
    import tkMessageBox as messagebox
    PYTHON_VER="2"
# print ("Python version: ", PYTHON_VER)

import subprocess32 as sp
import sys
import os
import time
import datetime
from PIL import Image, ImageTk, ImageDraw, ImageFont
import pickle
from random import shuffle
import getpass                      # Get user name for file storage

import locale                       # To set thousands separator as , or .
locale.setlocale(locale.LC_ALL, '') # Use '' for auto

# mserve modules
import location as lc               # Home grown module
```

As my program/script approaches 5,000 lines I've come over to the light side / (Dark side?) and started using imported modules of my own design. The first module is called `location.py` but!, lo and behold I've had to repeat import statements already imported in the parent program `mserve`.

EG at header:

``` 
from __future__ import print_function       # Must be first import
import getpass
import os
import pickle
import time
```

And just tonight on a new function I'm writing:

{% include copyHeader.html %}
``` 
import Tkinter as tk

class MsgDisplay:
    ''' Text Widget with status messages
    '''

    def __init__(self, title, toplevel, width, height):

        self.line_cnt = 0                   # Message lines displayed so far
        toplevel.update_idletasks()         # Get up-to-date window co-ords

        x = toplevel.winfo_x()
        y = toplevel.winfo_y()
        w = toplevel.winfo_width()
        h = toplevel.winfo_height()
        xd = (w/2) - (width/2)
        yd = (h/2) - (height/2)
        print('x:',x,'y:',y,'w:',w,'h:',h,
              'width:',width,'height:',height,'xd:',xd,'yd:',yd)
        
        ''' Mount message textbox window at centered in passed toplevel '''
        self.msg_top = tk.Toplevel()
        self.textbox = tk.Text(self.msg_top, height=height, width=width)
        self.msg_top.geometry('%dx%d+%d+%d'%(width, height, x + xd, y + yd))
#        self.textbox.columnconfigure(0, weight=1)
#        self.textbox.rowconfigure(0, weight=1)
        
        self.textbox.pack()
        self.textbox.insert(tk.END, "Just a text Widget\nin two lines\n")

    def Update(self, msg_list):
        self.textbox.insert(tk.END, "Just a text Widget\nin two lines\n")
        time.sleep(.1)
        
    def Close(self):
        self.msg_top.destroy()
```

The new import I just added:

``` 
import Tkinter as tk
```

Is a shortcut / fudge because production version would need to be:

``` 
try:
    import tkinter as tk
except ImportError: # Python 2
    import Tkinter as tk
```

Before preaching python 2.7.12 is obsolete please note I'm using Ubuntu 16.04 whose EOL is 2021. Also note we use Windows 2008 Server at work and legacy systems written in COBOL are common so who cares?

I must be doing something wrong because a module that is imported should not have to import what parent already did? In a normal environment the child should know / inherent what the parent already knows.

As an aside, tonight's new class "MsgDisplay" should be in parent and not in child. It was simpler to put the class in the child rather than figuring out how a child could call a parent class.
