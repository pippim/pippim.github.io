---
layout:       post
title:        >
    How can I set the row height in Tkinter TreeView?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59530481
type:         Answer
tags:         python tkinter treeview hidpi
created_date: 2019-12-30 11:59:50
edit_date:    2019-12-30 12:19:51
votes:        "6 "
favorites:    
views:        "15,178 "
accepted:     
uploaded:     2023-10-03 15:44:26
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-30-How-can-I-set-the-row-height-in-Tkinter-TreeView_.md
toc:          false
navigation:   false
clipboard:    false
---

I already have a variable setup for font size and would like to avoid setting up a variable for row height. So my code looks like this:

``` 
style = ttk.Style()
style.configure("Treeview.Heading", font=(None, LARGE_FONT), \
                rowheight=int(LARGE_FONT*2.5))
style.configure("Treeview", font=(None, MON_FONTSIZE), \
                rowheight=int(MON_FONTSIZE*2.5))
```

When `LARGE_FONT` is set to `14`, the row height is set to `35`. When `MON_FONTSIZE` is set to `12`, the row height is calculated as `30`.

The end result has the correct spacing (IMO) for the system font. YMMV for other font families though:

[![wman gnome gsettings.png][1]][1]


  [1]: https://i.stack.imgur.com/cBaDQ.png
