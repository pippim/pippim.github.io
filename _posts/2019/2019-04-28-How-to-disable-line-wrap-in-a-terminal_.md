---
layout:       post
title:        >
    How to disable line wrap in a terminal?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/515938
type:         Answer
tags:         terminal
created_date: 2019-04-28 01:15:29
edit_date:    2022-02-18 17:27:07
votes:        "20 "
favorites:    
views:        "116,963 "
accepted:     
uploaded:     2023-01-03 19:49:43
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-28-How-to-disable-line-wrap-in-a-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

You can temporarily disable line wrapping by entering this command::

``` 
tput rmam
```

To restore line wrapping use this command:

``` 
tput smam
```
