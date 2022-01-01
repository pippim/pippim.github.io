---
layout:       post
title:        >
    syntax error near unexpected token `
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196192
type:         Answer
tags:         command-line bash
created_date: !!str "2019-12-14 20:01:55"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "1,589"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

The command itself works fine:

``` 
$ for d in */; do echo "$d" ; done
subdir-A/
subdir-B/
```

However you have a hidden `'` in front of the `for` command. Perhaps the file was copied from Windows. The easiest solution is to create a new `test.sh` file and copy the above command into it.

