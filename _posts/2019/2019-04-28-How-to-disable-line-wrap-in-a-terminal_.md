---
layout:       post
title:        >
    How to disable line wrap in a terminal?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/515938
type:         Answer
tags:         terminal
created_date: 2019-04-28 01:15:29
edit_date:    
votes:        "14 "
favorites:    
views:        "104,119 "
accepted:     
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-28-How-to-disable-line-wrap-in-a-terminal_.md
toc:          false
navigation:   false
clipboard:    false
---

You can disable line wrapping for `less`, `tail` and every other command under the Linux sun with:

``` 
tput rmam
```

To restore line wrapping use:

``` 
tput smam
```
