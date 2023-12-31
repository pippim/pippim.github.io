---
layout:       post
title:        >
    Simple command-line calculator
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/523984
type:         Answer
tags:         shell calculator
created_date: 2019-06-10 10:44:12
edit_date:    2019-06-10 10:52:47
votes:        "0 "
favorites:    
views:        "96,261 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-10-Simple-command-line-calculator.md
toc:          false
navigation:   false
clipboard:    false
---

Creating a one-liner:

``` 
$ c () { echo $(( ${1} )) }
```

Now you can use simple integer math:

``` 
$ c 1+1
2

$ c 25*4
100

$ c 25*4-10
90

$ c 20*5/4
25
```

