---
layout:       post
title:        >
    How to change Terminal Title in ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1164870
type:         Answer
tags:         command-line bash 16.04
created_date: !!str "2019-08-10 23:13:16"
edit_date:    !!str "2019-08-11 00:24:52"
votes:        !!str "2"
favorites:    
views:        !!str "34,502"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
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
