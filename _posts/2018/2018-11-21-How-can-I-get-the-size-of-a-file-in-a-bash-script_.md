---
layout:       post
title:        >
    How can I get the size of a file in a bash script?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/483090
type:         Answer
tags:         bash shell files
created_date: 2018-11-21 00:13:32
edit_date:    2018-11-21 01:22:10
votes:        "0 "
favorites:    
views:        "698,506 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-21-How-can-I-get-the-size-of-a-file-in-a-bash-script_.md
toc:          false
navigation:   false
clipboard:    false
---

Fastest and simplest (IMO) method is:

``` 
bash_var=$(stat -c %s /path/to/filename)
```
