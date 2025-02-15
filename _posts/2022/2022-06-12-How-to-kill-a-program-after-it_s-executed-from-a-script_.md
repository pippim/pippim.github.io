---
layout:       post
title:        >
    How to kill a program after it's executed from a script?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1413743
type:         Answer
tags:         command-line bash sound scripts
created_date: 2022-06-12 23:30:27
edit_date:    
votes:        "0 "
favorites:    
views:        "558 "
accepted:     Accepted
uploaded:     2025-02-15 10:53:31
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-06-12-How-to-kill-a-program-after-it_s-executed-from-a-script_.md
toc:          false
navigation:   false
clipboard:    false
---

To kill all instances of `ffplay`, replace:

``` 
kill ${PID}
```

with:

``` 
pkill ffplay
```

This will make your life much simpler.
