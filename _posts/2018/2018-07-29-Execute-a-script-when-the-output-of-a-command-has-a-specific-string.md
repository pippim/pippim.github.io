---
layout:       post
title:        >
    Execute a script when the output of a command has a specific string
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1060425
type:         Answer
tags:         command-line bash scripts
created_date: !!str "2018-07-29 02:29:31"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "3,141"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

I would use this:

``` 
[[ $(Command1) == 1234 ]] && Command2

```

- The `[[` and `]]` tests if the condition inside is true
- `&&` executes `Command2` if the condition tested true
- `$(...)` executes command inside parenthesis and returns output (what was echoed inside `Command1`
``` 


```
