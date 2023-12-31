---
layout:       post
title:        >
    Prevent host shutting down when remotely logged in
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1251747
type:         Question
tags:         server ssh suspend client
created_date: 2020-06-19 01:55:05
edit_date:    2020-06-22 02:07:21
votes:        "0 "
favorites:    
views:        "893 "
accepted:     Accepted
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-19-Prevent-host-shutting-down-when-remotely-logged-in.md
toc:          false
navigation:   false
clipboard:    false
---

I have a laptop I'm setting up with SSH open server. It works great after I wake it up with magic packet and login with:

``` 
ssh user@host -Y
```

The problem is the laptop is designed to blank screen after five minutes and suspend after 20 minutes of inactivity.

How can I have a script (or canned package) send fake signals to server as if a user was typing on system? This way host system won't suspend after 20 minutes unless there were 20 minutes of inactivity on the client.

When simulating user activity I'd like the screen blanking to be honored as if there were no user activity on host. I just don't want laptop to suspend when remotely logged in.
