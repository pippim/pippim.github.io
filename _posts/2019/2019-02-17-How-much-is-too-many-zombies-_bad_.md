---
layout:       post
title:        >
    How much is too many zombies (bad)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1118975
type:         Answer
tags:         server
created_date: 2019-02-17 13:39:20
edit_date:    2020-06-12 14:37:07
votes:        "5 "
favorites:    
views:        "4,481 "
accepted:     
uploaded:     2025-05-18 09:39:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-02-17-How-much-is-too-many-zombies-_bad_.md
toc:          false
navigation:   false
clipboard:    false
---

### They won't cause any serious issues unless they start multiplying at a faster rate.


----------


This article is a good read:

### - [What Is a “Zombie Process” on Linux?][1]

[![enter image description here][2]][2]

> Zombies are basically the leftover bits of dead processes that haven’t  
> been cleaned up properly. A program that creates zombie processes  
> isn’t programmed properly – programs aren’t supposed to let zombie  
> processes stick around.  

## What’s a Zombie Process?

To understand what a zombie process is and what causes zombie processes to appear, you’ll need to understand a bit about how processes work on Linux.

When a process dies on Linux, it isn’t all removed from memory immediately — its process descriptor stays in memory (the process descriptor only takes a tiny amount of memory). The process’s status becomes EXIT_ZOMBIE and the process’s parent is notified that its child process has died with the SIGCHLD signal. The parent process is then supposed to execute the wait() system call to read the dead process’s exit status and other information. This allows the parent process to get information from the dead process. After wait() is called, the zombie process is completely removed from memory.

This normally happens very quickly, so you won’t see zombie processes accumulating on your system. However, if a parent process isn’t programmed properly and never calls wait(), its zombie children will stick around in memory until they’re cleaned up.

Utilities like GNOME System Monitor, the top command, and the ps command display zombie processes.

## Dangers of Zombie Processes

Zombie processes don’t use up any system resources. (Actually, each one uses a very tiny amount of system memory to store its process descriptor.) However, each zombie process retains its process ID (PID). Linux systems have a finite number of process IDs – 32767 by default on 32-bit systems. If zombies are accumulating at a very quick rate – for example, if improperly programmed server software is creating zombie processes under load — the entire pool of available PIDs will eventually become assigned to zombie processes, preventing other processes from launching.

However, a few zombie processes hanging around are no problem – although they do indicate a bug with their parent process on your system.

## Getting Rid of Zombie Processes

You can’t kill zombie processes as you can kill normal processes with the SIGKILL signal — zombie processes are already dead. Bear in mind that you don’t need to get rid of zombie processes unless you have a large amount on your system – a few zombies are harmless. However, there are a few ways you can get rid of zombie processes.

One way is by sending the SIGCHLD signal to the parent process. This signal tells the parent process to execute the wait() system call and clean up its zombie children. Send the signal with the kill command, replacing pid in the command below with the parent process’s PID:

``` 
kill -s SIGCHLD pid
```

However, if the parent process isn’t programmed properly and is ignoring SIGCHLD signals, this won’t help. You’ll have to kill or close the zombies’ parent process. When the process that created the zombies ends, init inherits the zombie processes and becomes their new parent. (init is the first process started on Linux at boot and is assigned PID 1.) init periodically executes the wait() system call to clean up its zombie children, so init will make short work of the zombies. You can restart the parent process after closing it.

If a parent process continues to create zombies, it should be fixed so that it properly calls wait() to reap its zombie children. File a bug report if a program on your system keeps creating zombies.


  [1]: https://www.howtogeek.com/119815/htg-explains-what-is-a-zombie-process-on-linux/
  [2]: https://pippim.github.io/assets/img/posts/2019/FasNG.jpg
