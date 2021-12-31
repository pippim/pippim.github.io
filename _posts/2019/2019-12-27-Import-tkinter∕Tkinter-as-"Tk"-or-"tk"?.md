---
layout:       post
title:        Import tkinter∕Tkinter as "Tk" or "tk"?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59506193
type:         Question
tags:         python tkinter
created_date: 2019-12-27 21:28:50
edit_date:    
votes:        0
favorites:    
views:        447
accepted:     Accepted
uploaded:     2021-12-30 17:00:34
toc:          false
navigation:   false
clipboard:    false
---

I've seen the light an will now convert all my tkinter references from `Canvas` to `Tk.Canvas`, from `Label` to `tk.Label`, and from `root = Tk()` to `root = tk.Tk()`, etc.

Stuck in between Python 2.7.12 and Python 3.5 my program stub looks like this:

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

try:
    import tkinter as Tk
    import tkinter.ttk as ttk
    import tkinter.font as font
except ImportError: # Python 2
    import Tkinter as Tk
    import ttk
    import tkFont as font
```

The question is should I be using `import tkinter as Tk` or `import tkinter as tk`?

I'm thinking the latter but I would like to stick to industry standards. Also take into consideration how most answers are written in **Stack Overflow**. Going with this majority means I can try code snippets with the least modifications.

The advantage I see using `import tkinter as tk` is:

- Tkk is imported as `ttk` so there is capitalization consistency.
- tkFont is imported as `font` so there is capitalization consistency.

I'm still on my first Python project and want to develop good reusable code for future projects.
