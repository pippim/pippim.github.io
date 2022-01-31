---
layout:       post
title:        >
    What is the difference between echo $var and echo "$var"
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1068366
type:         Answer
tags:         bash
created_date: 2018-08-23 23:56:06
edit_date:    
votes:        "5 "
favorites:    
views:        "3,064 "
accepted:     Accepted
uploaded:     2022-01-30 22:11:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-23-What-is-the-difference-between-echo-_var-and-echo-__var_.md
toc:          false
navigation:   false
clipboard:    false
---

There is no difference between `echo $var` and `echo "$var"`.

However for other commands such as `ls` (list files) there could be a big difference.

Try this in your terminal:

``` 
$ touch "File A"

$ var="File A"

$ ls $var
ls: cannot access 'File': No such file or directory
ls: cannot access 'A': No such file or directory

$ ls "$var"
File A
```

The double quotes `"` tells Linux to treat everything in between as a single entity. Without the double quotes everything inside is treated as separate entities delineated by spaces.

So in the first example `$var` is two different things "File" and "A".

In the second example `"$var"` is one thing `"File A"`.

The `echo` command automatically processes a single word or multiple words until the end of the line as one thing. Many other commands expect one or many things.
