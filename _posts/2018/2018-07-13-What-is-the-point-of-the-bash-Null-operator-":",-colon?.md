---
layout:       post
title:        >
    What is the point of the bash Null-operator ":", colon?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1054677
type:         Answer
tags:         bash scripts syntax
created_date: 2018-07-13 01:57:37
edit_date:    2018-07-13 02:16:03
votes:        "3 "
favorites:    
views:        "9,468 "
accepted:     
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    false
---

You can use it on the positive test of an `if` command when you only want to do something on the negative side. For example:



``` bash
if [[ True == False ]]; then
    :
else
    echo "true <> flase"
fi

```

Without the `:` bash would generate a syntax error.

This is an oversimplified example. Generally you would use such a technique in preliminary coding when you haven't written that code segment yet and just need something that doesn't generate an error.
