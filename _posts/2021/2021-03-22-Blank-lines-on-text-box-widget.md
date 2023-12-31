---
layout:       post
title:        >
    Blank lines on text box widget
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/66753608
type:         Answer
tags:         windows python-2.7 tkinter
created_date: 2021-03-22 20:45:43
edit_date:    2021-03-22 21:13:39
votes:        "0 "
favorites:    
views:        "1,462 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-03-22-Blank-lines-on-text-box-widget.md
toc:          false
navigation:   false
clipboard:    false
---

Textbox was always inserts a blank line at the end. The problem was compounded when editing textbox and yet another blank line was inserted. However during edit you could remove blank lines so you can't use `"end-1c"` all the time.

The trick was to remove 1 or more extra blank lines after editing:

``` 
    # Rebuild lyrics from textbox
    self.work_lyrics_score = \
        self.lyrics_score_box.get('1.0', tk.END)
    while self.work_lyrics_score.endswith('\n\n'):
        # Drop last blank line which textbox automatically inserts.
        # User may have manually deleted during edit so don't always assume
        self.work_lyrics_score = self.work_lyrics_score[:-1]       
```

Note however this is with Linux. For Windows you might need something like:

``` 
    while self.work_lyrics_score.endswith('\n\r\n\r'):
        # Drop last blank line which textbox automatically inserts.
        # User may have manually deleted during edit so don't always assume
        self.work_lyrics_score = self.work_lyrics_score[:-2]
```

Or whatever the the control code is for DOS/Windows LF/CR (Line Feed / Carriage Return) typewriter days style is.
