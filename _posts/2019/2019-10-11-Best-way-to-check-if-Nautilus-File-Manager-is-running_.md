---
layout:       post
title:        >
    Best way to check if Nautilus File Manager is running?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/546241
type:         Question
tags:         gnome desktop nautilus icons
created_date: 2019-10-11 02:21:53
edit_date:    2019-10-13 14:59:50
votes:        "2 "
favorites:    0
views:        "808 "
accepted:     Accepted
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-11-Best-way-to-check-if-Nautilus-File-Manager-is-running_.md
toc:          false
navigation:   false
clipboard:    false
---

I've been working hours on this problem. When nautilus file manager is NOT running nautilus is running because it controls icons on the desktop.

<!-- Language-all: lang-bash -->

``` 
$ ps -aux | grep nautilus | grep -v grep
rick      5613  0.2  1.7 2355392 140012 pts/19 Sl+  19:04   0:08 nautilus
```

So use this command without nautilus file manager open and you see:

``` 
$ ps -L -p 5613 -o pid,nice,lwp,comm
  PID  NI   LWP COMMAND
 5613   0  5613 nautilus
 5613   0  5614 gmain
 5613   0  5615 gdbus
 5613   0  5617 dconf worker
```

Now open up nautilus file manager and redo `ps` command:

``` 
$ nautilus

$ ps -L -p 5613 -o pid,nice,lwp,comm
  PID  NI   LWP COMMAND
 5613   0  5613 nautilus
 5613   0  5614 gmain
 5613   0  5615 gdbus
 5613   0  5617 dconf worker
 5613   0  4788 pool
```

Close the nautilus files window and rerun the command (after waiting a second or two) and the pool disappears.

Is this the correct way of seeing if nautilus file manager is running?

I've incorporated above technique into an answer in **Ask Ubuntu** I'd like to improve if possible:

- [How can I automatically relaunch nautilus if I quit the program?][1]


  [1]: {% post_url /2019/2019-10-13-How-can-I-automatically-relaunch-nautilus-if-I-quit-the-program_ %}
