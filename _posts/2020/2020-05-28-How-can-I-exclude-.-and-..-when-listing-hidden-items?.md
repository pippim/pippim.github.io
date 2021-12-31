---
layout:       post
title:        >
    How can I exclude . and .. when listing hidden items?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1244495
type:         Answer
tags:         command-line ls hidden-files
created_date: !!str "2020-05-28 10:53:24"
edit_date:    !!str "2020-05-28 12:31:35"
votes:        !!str "4"
favorites:    
views:        !!str "460"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

From the second answer in:

- https://askubuntu.com/questions/468901/how-to-show-only-hidden-files-in-terminal

This works on my machine (I'm not using SSH like the OP though):

``` 
ls -d .!(|.)

```

If there are no hidden files or directories you will get an error message:

``` 
$ ls -d .!(|.)
ls: cannot access '.!(|.)': No such file or directory

```

The error message occurs on directories with no hidden files because `.` and `..` are excluded.

## `shopt` consideration

From comments:

`ls -d .[!.]*` works without `extglob`
