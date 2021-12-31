---
layout:       post
title:        >
    Ensure python script isn't run as root
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/60292202
type:         Answer
tags:         python sudo
created_date: !!str "2020-02-19 02:37:54"
edit_date:    !!str ""
votes:        !!str "4"
favorites:    
views:        !!str "55"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
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
