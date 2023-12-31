---
layout:       post
title:        >
    Python tkinter after
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67561629
type:         Answer
tags:         python tkinter raspberry-pi2
created_date: 2021-05-16 21:12:18
edit_date:    
votes:        "0 "
favorites:    
views:        "2,658 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-16-Python-tkinter-after.md
toc:          false
navigation:   false
clipboard:    false
---

You can get closer timing with something like this:

``` python
def callback(self):
    time_start = time.time()
    # DO YOUR WORK HERE
    time_used = (time.time() - time_start) * 1000
    sleep = 200 - time_used
    if sleep < 1:
        sleep = 1
    self.after(sleep, self.callback)
```

I've been using this successfully to ensure puslseaudio sets volume every 1/10th second while python calculates the next volume and factors in time for subprocess Linux shell command launched in background to complete.
