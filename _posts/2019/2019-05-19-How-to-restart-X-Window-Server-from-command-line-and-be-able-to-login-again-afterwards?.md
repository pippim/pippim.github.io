---
layout:       post
title:        >
    How to restart X Window Server from command line and be able to login again afterwards?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1144565
type:         Answer
tags:         19.04
created_date: !!str "2019-05-19 17:58:24"
edit_date:    !!str "2021-04-13 22:41:11"
votes:        !!str "3"
favorites:    
views:        !!str "6,382"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

This old Q&A: https://askubuntu.com/questions/100226/how-to-restart-gnome-shell-from-command-line/814336#814336 may have the answers for you.

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
