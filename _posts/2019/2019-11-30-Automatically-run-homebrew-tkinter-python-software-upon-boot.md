---
layout:       post
title:        >
    Automatically run homebrew tkinter python software upon boot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1192764
type:         Answer
tags:         bash scripts
created_date: 2019-11-30 15:45:49
edit_date:    
votes:        "0 "
favorites:    
views:        "99 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-30-Automatically-run-homebrew-tkinter-python-software-upon-boot.md
toc:          false
navigation:   false
clipboard:    false
---

Startup Applications does not recognize `~` and expand it to `/home/kevin` so you need to format the command as:

``` 
/home/kevin/.todo/todorun.sh
```
