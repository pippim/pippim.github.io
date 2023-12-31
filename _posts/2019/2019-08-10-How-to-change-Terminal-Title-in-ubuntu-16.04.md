---
layout:       post
title:        >
    How to change Terminal Title in ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1164870
type:         Answer
tags:         command-line bash 16.04
created_date: 2019-08-10 23:13:16
edit_date:    2019-08-11 00:24:52
votes:        "3 "
favorites:    
views:        "37,315 "
accepted:     
uploaded:     2023-12-31 12:14:44
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-10-How-to-change-Terminal-Title-in-ubuntu-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

This is the function I use in my `~/.bashrc` file:

``` 
function termtitle() { PS1="${PS1/\\u@\\h: \\w/$@}"; }
```

After adding it (or changing it) you must resource your file:

``` 
. ~/.bashrc
```

To use it type something like:

``` 
termtitle Special Projects
```

After changing the title once, you must resource to change it again:

``` 
. ~/.bashrc
termtitle My new title
```
