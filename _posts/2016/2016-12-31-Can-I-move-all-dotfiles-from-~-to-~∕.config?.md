---
layout:       post
title:        >
    Can I move all dotfiles from ~ to ~∕.config?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/866531
type:         Answer
tags:         home-directory
created_date: 2016-12-31 16:37:51
edit_date:    2017-04-13 12:24:55
votes:        "9 "
favorites:    
views:        "6,253 "
accepted:     
uploaded:     2022-01-11 18:01:29
toc:          false
navigation:   false
clipboard:    false
---

## No you can't move ~/.* to ~/.config

Most files and directories beginning with `.` in the top level home directory (`/home/$USER`) are controlled by applications doing things on your behalf. 

Folders within such as `.../Documents`, `.../Pictures`, `.../Downloads`, etc. are almost always your exclusive domain. The best practice is to never put your own files into `/home/$USER`(`~`). Then you aren't inconvenienced by searching through all the `.` files and directories that you don't control.

## Using the good ship `Nautilus` to navigate troubled waters

I'm a self-confessed CLF (Command Line Freak) dating back to IBM PC-DOS days. After a few years though I've come to admire the efficiency and power of `Nautilus`.

Within the Nautilus file manager you can hide these files and directories from your eyes. Go to the top bar `Files` menu and select `Edit` then `Preferences` and unset the option on this screen:

[![Nautilus hide system files][1]][1]

In answering this question I did the above myself and instantly the main Nautilus window repainted. To my surprise I discovered a dozen of my own files that had been hidden within all the system files. I moved them to appropriate sub-directories or deleted them.

### Nautilus hot key / keyboard shortcut

Press <kbd>Ctrl</kbd>+<kbd>H</kbd> to toggle hidden files / directories viewing on and off. This doesn't change the permanent settings described in the previous section. It only lasts for your current session but saves you the inconvenience of changing the configuration for one time views.

Many thanks to commentators below ([@videonauth](https://askubuntu.com/users/522934/videonauth) and [@utf-8](https://askubuntu.com/users/195768/utf-8)) for providing information on this section.

  [1]: https://i.stack.imgur.com/2RPWN.png
