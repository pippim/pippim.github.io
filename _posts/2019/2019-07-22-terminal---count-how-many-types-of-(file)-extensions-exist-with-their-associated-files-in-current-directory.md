---
layout:       post
title:        >
    terminal - count how many types of (file) extensions exist with their associated files in current directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160058
type:         Answer
tags:         command-line gnome-terminal
created_date: !!str "2019-07-22 04:26:20"
edit_date:    !!str "2019-07-22 04:35:45"
votes:        !!str "1"
favorites:    
views:        !!str "339"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

The duplicate candidate (deep down) has a close answer. Here it is modified:

``` 
find . -maxdepth 1 -type f | sed 's/.*\.//' | sort | uniq -c

```
