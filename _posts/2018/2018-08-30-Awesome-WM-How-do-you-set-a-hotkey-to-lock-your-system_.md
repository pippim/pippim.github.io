---
layout:       post
title:        >
    Awesome WM - How do you set a hotkey to lock your system?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1070660
type:         Answer
tags:         window-manager awesome
created_date: 2018-08-30 21:56:00
edit_date:    2018-08-30 23:17:59
votes:        "3 "
favorites:    
views:        "2,203 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-30-Awesome-WM-How-do-you-set-a-hotkey-to-lock-your-system_.md
toc:          false
navigation:   false
clipboard:    false
---

From Arch Linux [How to lock screen with awesome window manager \[SOLVED\]][1]:

> I will also recommend `xscreensaver`, simply because it has ways of  
> letting you know when the screen is locked (it comes with a ton of  
> screensavers to chose from). To lock using `xscrensaver`, do this:  
>   
> 1. Install xscreensaver (Ed: `sudo apt install xscreensaver`)  
> 2. Add `xscreensaver -no-splash &` to your `$HOME/.xinitrc` (Ed: This file doesn't exist in Ubuntu Unity 16.04. In **Startup Applications** you add the command `xscreensaver -nosplash`)  
> 3. Make a keybinding in Awesome that spawns `xscreensaver-command -lock`. This will start the screensaver and ask for a password.  
>   
> Suckless' `slock` is rather small, but all it does is blank the screen  
> and wait for input. Input is not even echoed, you don't see anything,  
> so you might as well have a locked box and not know it.  

<sub>When you see **(Ed: ...)** above, they are comments added by me and are not in Arch Linux answer</sub>

  [1]: https://bbs.archlinux.org/viewtopic.php?id=82746
