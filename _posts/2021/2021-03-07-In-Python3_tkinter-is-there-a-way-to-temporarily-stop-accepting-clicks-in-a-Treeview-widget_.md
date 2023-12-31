---
layout:       post
title:        >
    In Python3/tkinter is there a way to temporarily stop accepting clicks in a Treeview widget?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/66522189
type:         Answer
tags:         python-3.x tkinter treeview
created_date: 2021-03-07 22:33:34
edit_date:    
votes:        "0 "
favorites:    
views:        "481 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-03-07-In-Python3_tkinter-is-there-a-way-to-temporarily-stop-accepting-clicks-in-a-Treeview-widget_.md
toc:          false
navigation:   false
clipboard:    false
---

This worked for me:

``` python
tree.bind("<ButtonRelease-1>", my_select_function)
# Do some stuff
tree.unbind("<ButtonRelease-1>")
```
