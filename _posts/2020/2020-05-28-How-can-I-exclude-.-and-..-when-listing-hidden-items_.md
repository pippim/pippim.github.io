---
layout:       post
title:        >
    How can I exclude . and .. when listing hidden items?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1244495
type:         Answer
tags:         command-line ls hidden-files
created_date: 2020-05-28 10:53:24
edit_date:    2020-05-28 12:31:35
votes:        "4 "
favorites:    
views:        "589 "
accepted:     Accepted
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-05-28-How-can-I-exclude-.-and-..-when-listing-hidden-items_.md
toc:          false
navigation:   false
clipboard:    false
---

From the second answer in:

- [How to show only hidden files in Terminal?](How to show only hidden files in Terminal?)

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
