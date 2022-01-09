---
layout:       post
title:        >
    How to test strings for lexicographic less than or equal in Bash?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/43727451
type:         Answer
tags:         bash
created_date: 2017-05-01 22:31:42
edit_date:    2017-06-22 22:54:43
votes:        "3 "
favorites:    
views:        "33,634 "
accepted:     
uploaded:     2022-01-09 10:02:40
toc:          false
navigation:   false
clipboard:    false
---

You can flip the comparison and sign around and test negatively:

``` 
$ a="abc"
$ b="abc"
$ if ! [[ "$b" > "$a" ]] ; then  echo "a <= b" ; fi
a <= b

```

If you want collating sequence of "A" then "a" then "B"... use:

``` 
shopt -s nocaseglob

```
