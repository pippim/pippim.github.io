---
layout:       post
title:        >
    writing a text file in the terminal with touch
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/896957
type:         Answer
tags:         ubuntu-touch
created_date: 2017-03-26 03:39:10
edit_date:    
votes:        "5 "
favorites:    
views:        "76,336 "
accepted:     
uploaded:     2023-09-19 23:19:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-26-writing-a-text-file-in-the-terminal-with-touch.md
toc:          false
navigation:   false
clipboard:    false
---

If I understand your question correctly you want to use:

``` 
echo "hello" > ~/Desktop/new_file.txt && echo "world" >> ~/Desktop/new_file.txt
```

Then to check the results use `cat ~/Desktop/new_file.txt` which shows:

``` 
hello
world
```

There's a shorter way of doing this but I'm kind of new to Linux myself.
