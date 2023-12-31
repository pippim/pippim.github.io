---
layout:       post
title:        >
    Can't Permanently Disable Touchpad
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/885197
type:         Answer
tags:         16.04 touchpad
created_date: 2017-02-20 02:15:42
edit_date:    
votes:        "0 "
favorites:    
views:        "638 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-20-Can_t-Permanently-Disable-Touchpad.md
toc:          false
navigation:   false
clipboard:    false
---

The simple way is to use:

``` 
xinput disable 13
```

Try this first at the terminal every time you boot. If you are happy then put it in Startup Applications.
