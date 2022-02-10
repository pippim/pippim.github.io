---
layout:       post
title:        >
    Cronjob not executing, but command works
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/491623
type:         Answer
tags:         ubuntu cron
created_date: 2018-12-30 17:18:04
edit_date:    2018-12-30 17:20:41
votes:        "2 "
favorites:    
views:        "312 "
accepted:     Accepted
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-30-Cronjob-not-executing_-but-command-works.md
toc:          false
navigation:   false
clipboard:    false
---

In the terminal use:

``` 
echo $PATH
```

When `cron` is running it doesn't know all your paths that allows your python script work in the terminal.

The solution is to create a bash script that calls the python script. Before doing so however it executes:

``` 
PATH="new-paths:$PATH"
```
