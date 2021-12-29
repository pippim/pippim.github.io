---
layout:       post
title:        How to disable line wrap in a terminal?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/515938
type:         Answer
tags:         terminal
created_date: 2019-04-28 01:15:29
edit_date:    
votes:        12
favorites:    
views:        101,954
accepted:     
uploaded:     2021-12-28 20:06:53
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
