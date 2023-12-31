---
layout:       post
title:        >
    is there a fix for mouse going off the edge of the screen?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1026833
type:         Answer
tags:         ubuntu-studio multiple-monitors
created_date: 2018-04-21 02:59:03
edit_date:    
votes:        "1 "
favorites:    
views:        "5,857 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-21-is-there-a-fix-for-mouse-going-off-the-edge-of-the-screen_.md
toc:          false
navigation:   false
clipboard:    false
---

## Building a better Mouse Trap

My mouse pointer can also move off the edge of the screen. It's never really bothered me. Even in when the mouse pointer is on the screen there are times I can't seen it so I changed the color to red. For even greater ability to locate the mouse pointer, even when it is moved off the screen, as the `.gif` below shows, you can reveal the mouse pointer by tapping and releasing the <kbd>Control</kbd> key:

[![mouse off screen.gif][1]][1]

To enable the mouse pointer locating feature use this command:

``` 
gsettings set org.gnome.settings-daemon.peripherals.mouse locate-pointer true
```
  [1]: [<img src="https://i.stack.imgur.com/m2Nrs.gif" alt="mouse off screen.gif">](<img src="https://i.stack.imgur.com/m2Nrs.gif" alt="mouse off screen.gif">)
