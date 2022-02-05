---
layout:       post
title:        >
    How do I run a global npm program when an ubuntu program has the same name?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1068153
type:         Answer
tags:         apt 18.04 nodejs npm
created_date: 2018-08-23 10:45:11
edit_date:    2018-08-25 02:57:55
votes:        "1 "
favorites:    
views:        "1,763 "
accepted:     Accepted
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-23-How-do-I-run-a-global-npm-program-when-an-ubuntu-program-has-the-same-name_.md
toc:          false
navigation:   false
clipboard:    false
---

Assuming you don't need the weather program `ncu` which is causing the conflict, the easiest solution would be to uninstall it using:

``` 
npm uninstall -g ncu
```
