---
layout:       post
title:        >
    Execute a script when the output of a command has a specific string
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1060425
type:         Answer
tags:         command-line bash scripts
created_date: 2018-07-29 02:29:31
edit_date:    
votes:        "2 "
favorites:    
views:        "10,343 "
accepted:     
uploaded:     2025-10-19 18:25:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-29-Execute-a-script-when-the-output-of-a-command-has-a-specific-string.md
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
