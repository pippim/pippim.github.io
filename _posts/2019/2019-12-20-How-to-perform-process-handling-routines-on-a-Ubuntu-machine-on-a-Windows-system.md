---
layout:       post
title:        >
    How to perform process handling routines on a Ubuntu machine on a Windows system
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1197406
type:         Answer
tags:         windows windows-10 process windows-subsystem-for-linux
created_date: 2019-12-20 03:24:50
edit_date:    
votes:        "0 "
favorites:    
views:        "127 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-20-How-to-perform-process-handling-routines-on-a-Ubuntu-machine-on-a-Windows-system.md
toc:          false
navigation:   false
clipboard:    false
---

From [Wikipedia][1]:

> The proc filesystem provides a method of communication between kernel  
> space and user space. For example, the GNU version of the process  
> reporting utility `ps` uses the proc file system to obtain its data,  
> without using any specialized system calls.  

The `ps` command allows you to control the Linux Kernel. On Windows 10 WSL (version 1) there is no Linux Kernel for the `ps` command to control. There is only a Windows 10 kernel.

Things may change in future WSL versions but for the time being you can enjoy learning about all the GNU utilities like `grep`, `sed` and even GUI apps if you install Ubuntu Desktop:

- [What&#39;s the easiest way to run GUI apps on Windows Subsystem for Linux as of 2018?](What&#39;s the easiest way to run GUI apps on Windows Subsystem for Linux as of 2018?)

  [1]: https://en.wikipedia.org/wiki/Procfs
