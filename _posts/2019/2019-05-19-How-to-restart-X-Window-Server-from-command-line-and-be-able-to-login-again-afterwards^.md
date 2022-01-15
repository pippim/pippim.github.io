---
layout:       post
title:        >
    How to restart X Window Server from command line and be able to login again afterwards?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1144565
type:         Answer
tags:         19.04
created_date: 2019-05-19 17:58:24
edit_date:    2021-04-13 22:41:11
votes:        "3 "
favorites:    
views:        "6,554 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-19-How-to-restart-X-Window-Server-from-command-line-and-be-able-to-login-again-afterwards^.md
toc:          false
navigation:   false
clipboard:    false
---

This old Q&A: [How to restart GNOME Shell from command line?](How to restart GNOME Shell from command line?)6 may have the answers for you.

Initially these used to work for people:

- The easiest way is to <kbd>Alt</kbd>+<kbd>F2</kbd> and type `r` then <kbd>↵</kbd>.
- The command to replace the gnome-shell would be `gnome-shell --replace`.

Now days this seems to be the only solution:

- You can also do a `killall -3 gnome-shell`.

**Note:** This Q&A focuses on restarting gnome display manager **without** loosing all work and going back to Login screen.


----------

## What does <kbd>Alt</kbd>+<kbd>F2</kbd> do?

From: [13 Keyboard Shortcut Every Ubuntu 18.04 User Should Know](https://itsfoss.com/ubuntu-shortcuts/)

> <b>10. Alt+F2: Run console</b>  
>   
> This is for power users. If you want to run a quick command, instead  
> of opening a terminal and running the command there, you can use  
> <kbd>Alt</kbd>+<kbd>F2</kbd> to run the console.  
