---
layout:       post
title:        >
    Configure screensaver in Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1070684
type:         Answer
tags:         configuration screensaver
created_date: 2018-08-30 23:59:14
edit_date:    2019-05-22 10:40:26
votes:        "3 "
favorites:    
views:        "250,967 "
accepted:     
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-30-Configure-screensaver-in-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

Radu's answer is a good one so I won't duplicate it. I will point out extra steps recommended by the `xscxreensaver` developer. I'm also including a short paragraph of history from the developer.


----------

> ##[USING GNOME OR UNITY][1]  
>   
> For the better part of a decade, GNOME shipped `xscreensaver` as-is,  
> and everything just worked out of the box. In 2005, however, they  
> decided to re-invent the wheel and ship their own replacement for the  
> xscreensaver daemon called "gnome-screensaver", rather than improving  
> xscreensaver and contributing their changes back. As a result, the  
> "gnome-screensaver" program is insecure, bug-ridden, and missing many  
> features of xscreensaver. You shouldn't use it.  
>   
> To replace gnome-screensaver with xscreensaver:  
>   
> 1. Fully uninstall the gnome-screensaver package.  
>   
>     `sudo apt-get remove gnome-screensaver`  
>   
> 2. Launch xscreensaver at login.  
>   
>     Select "Startup Applications" from the menu (or manually launch "gnome-session-properties") and add "xscreensaver".  
>   
> 3. Make GNOME's "Lock Screen" use xscreensaver.  
>   
>     `sudo ln -sf /usr/bin/xscreensaver-command /usr/bin/gnome-screensaver-command`  
>   
>     That doesn't work under Unity, though. Apparently it has its own built-in screen locker which is not gnome-screensaver, and cannot be  
> removed, and yet still manages to be bug-addled and insecure. Keep  
> reinventing that wheel, guys! (If you have figured out how to replace  
> Unity's locking "feature" with xscreensaver, let me know.)  
>   
> 4. Turn off Unity's built-in blanking.  
>   
>    Open "System Settings / Brightness & Lock";  
>   
>    Un-check "Start Automatically";  
>   
>    Set "Turn screen off when inactive for" to "Never."  


----------

## Disclaimer

I do not agree with the strong language of the developer but felt it better to include the history rather than hide it.


----------

## Ubuntu 18.04 special notes

Many have complained when locking screen with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd> external monitors blank instantly and those with dpms are switched off. This causes unwanted delays when unlocking screen. Using `xscreensaver` will circumvent that particular problem.

You can decommission the <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd> shortcut from `gnome-screensaver` and assign it to a new command for `xscreensaver`:

``` 
xscreensaver-command -lock
```

This keyboard shortcut reassignment also works in Ubuntu 16.04.

  [1]: https://www.jwz.org/xscreensaver/man1.html
