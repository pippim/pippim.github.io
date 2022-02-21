---
layout:       post
title:        >
    Wall broadcast message in terminal to desktop popup message?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1253239
type:         Question
tags:         libnotify
created_date: 2020-06-24 01:34:42
edit_date:    
votes:        "3 "
favorites:    
views:        "48 "
accepted:     
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-24-Wall-broadcast-message-in-terminal-to-desktop-popup-message_.md
toc:          false
navigation:   false
clipboard:    false
---

I'll receive a `wall` broadcast message like this in my terminal:

``` 
Broadcast message from rick@dell (somewhere) (Tue Jun 23 19:21:32 2020):       
                                                                               
If no activity, shutdown in: 15 minute(s).
```

Can a job be running on my machine that watches my terminal screen for messages like this and issue a desktop popup bubble message with libnotify send?

The message may have already scrolled off the screen if a batch job is running.

I know I can install ssh server on my local machine and the server/remote host can issue libnotify sends instead of `wall` broadcasts but that isn't my first choice. I also know I can use `nc` (netcast) but that is less appealing.
