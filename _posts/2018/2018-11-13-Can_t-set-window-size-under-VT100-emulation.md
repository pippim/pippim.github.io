---
layout:       post
title:        >
    Can't set window size under VT100 emulation
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1092620
type:         Answer
tags:         command-line resize
created_date: 2018-11-13 17:33:18
edit_date:    
votes:        "2 "
favorites:    
views:        "1,842 "
accepted:     Accepted
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-13-Can_t-set-window-size-under-VT100-emulation.md
toc:          false
navigation:   false
clipboard:    false
---

Instead of using:

``` 
$ resize 40 80
resize: Can't set window size under VT100 emulation
```

Try using:

``` 
printf '\e[8;40;80t'
```

You can also use `Edit` -> `Profile preferences` and set the initial screen size every time your terminal opens.
