---
layout:       post
title:        >
    Can't set window size under VT100 emulation
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1092620
type:         Answer
tags:         command-line resize
created_date: !!str "2018-11-13 17:33:18"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "1,658"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
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
