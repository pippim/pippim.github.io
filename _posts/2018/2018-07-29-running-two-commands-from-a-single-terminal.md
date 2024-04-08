---
layout:       post
title:        >
    running two commands from a single terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1060423
type:         Answer
tags:         command-line
created_date: 2018-07-29 02:07:35
edit_date:    2018-07-29 02:13:27
votes:        "2 "
favorites:    
views:        "1,352 "
accepted:     Accepted
uploaded:     2024-04-08 06:23:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-29-running-two-commands-from-a-single-terminal.md
toc:          false
navigation:   false
clipboard:    false
---

You could type these commands after the `$` prompt:

``` 
$ sudo apt update &
[1] 24966

$ firefox

[1]+  Stopped                 sudo apt update
```


The first command followed by `&` tells it to start in a second terminal (background session). The terminal immediately displays the process ID (`24966`) of the background session and prompts for another command. When the first command finishes you are notified in the terminal by:

``` 
[1]+  Stopped                 sudo apt update
```
