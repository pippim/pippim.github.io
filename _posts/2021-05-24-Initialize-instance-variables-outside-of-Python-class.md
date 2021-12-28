---
layout:       post
title:        Initialize instance variables outside of Python class
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67667116
type:         Question
tags:         python class initialization instance-variables
created_date: 2021-05-24 05:36:20
edit_date:    2021-05-24 11:27:35
votes:        0
favorites:    
views:        41
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    true
---

### Edit

In comments inheritance was suggested however this is already being done and I've added additional code snippet to show.


----------


There are a few similar questions of initializing instance variables outside of `__init__` where instance variables are initialized further down in the class within another `def` function (method). This question isn't a duplicate of those questions.

I have three classes all declaring the same `self.xxxx` instance variables after the `def __init__`:

{% include copyHeader.html %}
``` python
class AskQuestion(simpledialog.Dialog):
    """ Prepends "\n" to text passed.
        Appends "\n\nAre you sure?\n" to text passed.
        Allows text to be highlighted and copied to clipboard with CTRL+C.
        Blocks other windows from getting focus
        MON_FONTSIZE is temporary font size until configuration file set up.
    """

    def __init__(self, parent, title=None, text=None, confirm='yes',
                 align='center', thread=None, icon='warning'):
        self.confirm = confirm      # Append "Are you sure?" line?
        self.align = align          # data (text lines) alignment
        self.thread = thread        # The thread run before button click
        self.loop_no = 1            # Loop counter (not used yet)
        self.data = text            # data (text lines) for text box
        self.text = None            # Textbox widget
        self.icon = icon            # Warning, Error, Info, Question icons
        try:
            self.font = (None, MON_FONTSIZE)
        except NameError:
            self.font = (None, 10)

        # Shared functions
        self.wait_window = wait_window_func
        #self.body = body(self, parent)
        #self.body = body

        simpledialog.Dialog.__init__(self, parent, title=title)
```

How can these lines of code be spun out into a global function which is called to initialize the variables? I'm searching for a technique similar to the bash `.` (source command) or the C `#include` command except variables won't be sourced from another file, simply a global function within the current file (module).

FYI I'm looking for consistency and code reduction for tkinter simpledialog class wrappers for ShowInfo, AskQuestion, AskString, etc.
