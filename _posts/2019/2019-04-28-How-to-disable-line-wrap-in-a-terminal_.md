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
votes:        "14 "
favorites:    
views:        "106,574 "
accepted:     
uploaded:     2022-04-11 04:33:50
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
