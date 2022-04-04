---
layout:       post
title:        >
    Disable Ctrl-Alt-L's behavior of locking the screen
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1007760
type:         Answer
tags:         16.04 unity shortcut-keys lock-screen
created_date: 2018-02-19 17:26:48
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "10,255 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-19-Disable-Ctrl-Alt-L_s-behavior-of-locking-the-screen.md
toc:          false
navigation:   false
clipboard:    false
---

# Disable nothing and use `meta` key (aka Super or Windows key)

Hold down <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Meta</kbd>+<kbd>L</kbd> and Ubuntu will ignore this for Lock Screen but your application will interpret it as <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd>.

# Disable <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> in Ubuntu shortcuts

Go to System Settings -> Keyboard -> Shortcuts -> System -> Lock Screen and hold down <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>

[![ctrl+alt+L override.png][1]][1]

This will hopefully allow you to reassign the original key combination in another application.

# To disable lock screen permanently

Use:

``` 
gsettings set org.gnome.desktop.lockdown disable-lock-screen 'true'
```

Source: [https://ubuntuforums.org/showthread.php?t=2359828](https://ubuntuforums.org/showthread.php?t=2359828)

On my dual monitor system the lock screen no longer appears when pressing <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd>. However the screens saver still kicks in and you have to move mouse, touch a key, etc to turn the monitors back on. Although a password is not required to unlock the screen it might be a bug.


  [1]: https://i.stack.imgur.com/nanXH.png
