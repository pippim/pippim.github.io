---
layout:       post
title:        >
    Ensure python script isn't run as root
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/60292202
type:         Answer
tags:         python sudo
created_date: 2020-02-19 02:37:54
edit_date:    
votes:        "4 "
favorites:    
views:        "55 "
accepted:     
uploaded:     2022-01-19 20:40:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-02-19-Ensure-python-script-isn^t-run-as-root.md
toc:          false
navigation:   false
clipboard:    false
---

Put this into your Python program/script:

``` 
#import os

if os.geteuid() == 0:
    exit("You cannot call 'mmm' using using 'sudo' powers. Exiting.")
```

Of course you would replace `mmm` with your own python filename.
