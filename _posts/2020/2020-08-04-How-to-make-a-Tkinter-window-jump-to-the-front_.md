---
layout:       post
title:        >
    How to make a Tkinter window jump to the front?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63238973
type:         Answer
tags:         python tkinter focus
created_date: 2020-08-04 01:22:26
edit_date:    
votes:        "2 "
favorites:    
views:        "87,720 "
accepted:     
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-08-04-How-to-make-a-Tkinter-window-jump-to-the-front_.md
toc:          false
navigation:   false
clipboard:    false
---

This answer is to make one Tkinter Window pop up overtop of other Tkinter windows.

In my app I have a large window `toplevel` which calls a much smaller window `top2` which initially appears on top of `toplevel`.

If user clicks within `toplevel` window it gains focus and smothers much smaller `top2` window until `toplevel` window is dragged off of it.

The solution is to click the button in `toplevel` to launch `top2` again. The `top2` open function knows it is already running so simply lifts it to the top and gives it focus:



``` python
def play_items(self):
    ''' Play 1 or more songs in listbox.selection(). Define buttons:
            Close, Pause, Prev, Next, Commercial and Intermission
    '''

    if self.top2_is_active is True:
        self.top2.focus_force()     # Get focus
        self.top2.lift()            # Raise in stacking order
        root.update()
        return                      # Don't want to start playing again
```
