---
layout:       post
title:        >
    How to test strings for lexicographic less than or equal in Bash?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/43727451
type:         Answer
tags:         bash
created_date: !!str "2017-05-01 22:31:42"
edit_date:    !!str "2017-06-22 22:54:43"
votes:        !!str "3"
favorites:    
views:        !!str "33,405"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
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
