---
layout:       post
title:        >
    Purpose of ∕proc∕thread-self?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/51977002
type:         Question
tags:         linux multithreading linux-kernel proc
created_date: 2018-08-23 00:59:48
edit_date:    
votes:        "2 "
favorites:    
views:        "1,299 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

I'm fairly new to Linux OS programming world. I'm working on a project to control Intel CPU (turbo boost, hyper threading, min & max scaling frequencies to solve problems for other users). Whilst investigating `/proc/stat` for CPU utilization I stumbled across this:

``` 
$ ll /proc/thread-self
lrwxrwxrwx 1 root root 0 Aug 22 04:26 /proc/thread-self -> 9389/task/9389/

$ ll /proc/self
lrwxrwxrwx 1 root root 0 Aug 22 04:26 /proc/self -> 29420/

$ ll /proc/self
lrwxrwxrwx 1 root root 0 Aug 22 04:26 /proc/self -> 29636/

$ ll /proc/thread-self
lrwxrwxrwx 1 root root 0 Aug 22 04:26 /proc/thread-self -> 30021/task/30021/

```

`thread-self` and `self` are constantly changing every time you list the symbolic links with `ll`. The date and time remain at the last boot time though.

I did a little digging and found this [email chain in 2014][1]:

> This patchset implements `/proc/thread-self` a magic symlink that solves  
> a couple of problems.  

.... further down the email says:

>       proc: Have net show up under /proc/<tgid>/task/<tid>  
>       proc: Implement /proc/thread-self to point at the directory of the current thread  
>       proc: Point /proc/net at /proc/thread-self/net instead of /proc/self/net  
>       proc: Point /proc/mounts at /proc/thread-self/mounts instead of /proc/self/mounts  

How dp the symbolic link(s) work? Or how do we use them for meaningful analysis/display of what Linux is doing? Or are they simply meaningless and to be ignored as "fluff"?

  [1]: https://lwn.net/Articles/607422/
