---
layout:       post
title:        >
    Why can't I cd to a quoted tilde ('~')?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033554
type:         Answer
tags:         command-line bash
created_date: !!str "2018-05-08 11:48:30"
edit_date:    !!str ""
votes:        !!str "3"
favorites:    
views:        !!str "8,041"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

### Explore using `echo` command

The easiest way of exploring how things work in bash is with the `echo` command. In the case of `~` use this:

``` 
$ echo ~
/home/rick
$ echo '~'
~
$ echo "~"
~
$ echo `~`
bash: /home/rick: Is a directory

```

As you can see, when you single quote or use double quotes around `~` it is interpreted literally as a string and not expanded as a variable. When you use backticks (`) it is executed as a command and generates an error message.

