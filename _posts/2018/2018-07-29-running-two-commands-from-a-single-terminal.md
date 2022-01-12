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
views:        "1,052 "
accepted:     Accepted
uploaded:     2022-01-11 18:01:29
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
