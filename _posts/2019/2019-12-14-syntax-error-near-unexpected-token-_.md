---
layout:       post
title:        >
    syntax error near unexpected token `
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196192
type:         Answer
tags:         command-line bash
created_date: 2019-12-14 20:01:55
edit_date:    
votes:        "1 "
favorites:    
views:        "1,664 "
accepted:     Accepted
uploaded:     2022-02-12 11:18:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-14-syntax-error-near-unexpected-token-_.md
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

