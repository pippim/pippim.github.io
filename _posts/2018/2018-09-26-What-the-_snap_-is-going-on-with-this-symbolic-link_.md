---
layout:       post
title:        >
    What the "snap" is going on with this symbolic link?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1078743
type:         Question
tags:         snap symbolic-link
created_date: 2018-09-26 23:36:39
edit_date:    
votes:        "0 "
favorites:    
views:        "2,088 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-26-What-the-_snap_-is-going-on-with-this-symbolic-link_.md
toc:          false
navigation:   false
clipboard:    false
---

I was looking in `/usr/bin` tonight and saw this:

[![snapd in usr bin.png][1]][1]

The symbolic link in cyan / red is a curiosity:

``` 
lrwxrwxrwx  1 root root          25 Jul 19 04:48 ubuntu-core-launcher -> ../lib/snapd/snap-confine*
```

As I don't use `snapd` yet (Ubuntu 16.04 / Unity Interface) I'm not really concerned but I'm curious if anyone else has encountered this strange coloured link and what it means with all the dangerous looking red?


  [1]: https://i.stack.imgur.com/RgKvn.png
