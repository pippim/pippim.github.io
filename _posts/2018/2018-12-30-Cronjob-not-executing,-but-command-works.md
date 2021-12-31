---
layout:       post
title:        >
    Cronjob not executing, but command works
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/491623
type:         Answer
tags:         ubuntu cron
created_date: !!str "2018-12-30 17:18:04"
edit_date:    !!str "2018-12-30 17:20:41"
votes:        !!str "2"
favorites:    
views:        !!str "306"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
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
