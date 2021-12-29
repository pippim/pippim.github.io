---
layout:       post
title:        Show pid on the terminal title bar
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1179168
type:         Answer
tags:         gnome-terminal gui titlebar
created_date: 2019-10-06 20:47:39
edit_date:    
votes:        2
favorites:    
views:        73
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

If all you truly want to see is the pid then in the terminal type:

``` 
PS1="${PS1/\\u@\\h: \\w/$$}"

```

If you want this to be persistent every time you open your terminal then add the command somewhere near the bottom of `~/.bashrc` after all the other `PS1` definitions are set.
