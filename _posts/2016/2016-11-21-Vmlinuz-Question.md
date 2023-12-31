---
layout:       post
title:        >
    Vmlinuz Question
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/852015
type:         Answer
tags:         kernel windows icons
created_date: 2016-11-21 18:13:10
edit_date:    2016-11-22 00:46:25
votes:        "0 "
favorites:    
views:        "400 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-21-Vmlinuz-Question.md
toc:          false
navigation:   false
clipboard:    false
---

`vmlinuz` is part of the kernel along with `initrd.img`.

Together you could say they form the 'Operating System' like Windows is.  It could be a coding error by 'nemo' folks. Don't delete it.

The real files are kept in `/boot` and `vmlinuz` along with `vmlinuz.old` are symbolic links to the real files:

``` 
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ ll /boot/vmlinuz*
-rw------- 1 root root 5836336 Nov 11 07:15 /boot/vmlinuz-3.13.0-92-generic
-rw------- 1 root root 5017584 Oct 18 13:28 /boot/vmlinuz-3.2.0-113-generic
-rw------- 1 root root 7060896 Nov 19 11:34 /boot/vmlinuz-4.4.0-47-generic
-rw------- 1 root root 6988624 Nov 19 21:01 /boot/vmlinuz-4.4.33-040433-generic
-rw------- 1 root root 7046080 Jun 24 12:46 /boot/vmlinuz-4.6.3-040603-generic
-rw------- 1 root root 3974752 Aug 16 02:44 /boot/vmlinuz-4.7.1-040701-generic
-rw------- 1 root root 4134688 Aug 20 11:42 /boot/vmlinuz-4.7.2-040702-generic
-rw------- 1 root root 4134688 Sep  7 01:45 /boot/vmlinuz-4.7.3-040703-generic
-rw------- 1 root root 4138784 Sep 24 03:50 /boot/vmlinuz-4.7.5-040705-generic
-rw------- 1 root root 4994848 Oct  7 08:50 /boot/vmlinuz-4.8.1-040801-generic
-rw------- 1 root root 7427872 Oct 22 05:46 /boot/vmlinuz-4.8.4-040804-generic
-rw------- 1 root root 7427872 Nov 19 11:24 /boot/vmlinuz-4.8.5-040805-generic
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ ll /vmlinuz*
lrwxrwxrwx 1 root root 34 Nov 19 20:49 /vmlinuz -> boot/vmlinuz-4.4.33-040433-generic
lrwxrwxrwx 1 root root 29 Nov  9 17:00 /vmlinuz.old -> boot/vmlinuz-4.4.0-47-generic
───────────────────────────────────────────────────────────────────────────────
rick@dell:~$ 
```


When Nautilus is called by root user the `/` directory looks looks like this:

[![Nautilus Root User][1]][1]

As you can see there is no Windows icon like `nemo` uses but there is a unique looking icon used by `nautilus`.

These symbolic links in the `/` directory are simply handy references to show you which kernel you've currently booted with, and which kernel you booted with before that.

  [1]: https://i.stack.imgur.com/gfVxf.png
