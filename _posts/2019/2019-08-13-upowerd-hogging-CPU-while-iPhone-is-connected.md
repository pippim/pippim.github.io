---
layout:       post
title:        >
    upowerd hogging CPU while iPhone is connected
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1165392
type:         Answer
tags:         16.04 process ubuntu-mate
created_date: 2019-08-13 10:33:58
edit_date:    
votes:        "2 "
favorites:    
views:        "13,733 "
accepted:     
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-13-upowerd-hogging-CPU-while-iPhone-is-connected.md
toc:          false
navigation:   false
clipboard:    false
---

This just happened when I resumed the computer this morning. Going into suspend last night I had Power Panel left open. This morning Power Panel was all greyed out and the hard disk light was flashing like a disco light show.

I used these commands:

``` 
$ ps -aux | grep upowerd | grep -v grep
root      2013  0.5  0.0 349976  7372 ?        Rsl  Aug11  11:12 /usr/lib/upower/upowerd

$ sudo killall -9 upowerd
```

Of course now `upowerd` isn't running at all but that's OK it'll come back with the next reboot. I don't use it much anyway just to check when wireless mouse or keyboard batteries are low.
