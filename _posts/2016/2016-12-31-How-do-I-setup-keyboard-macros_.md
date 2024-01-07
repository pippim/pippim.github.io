---
layout:       post
title:        >
    How do I setup keyboard macros?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/866629
type:         Answer
tags:         keyboard shortcut-keys
created_date: 2016-12-31 23:10:06
edit_date:    2019-12-22 04:45:08
votes:        "24 "
favorites:    
views:        "51,691 "
accepted:     Accepted
uploaded:     2024-01-07 11:15:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-31-How-do-I-setup-keyboard-macros_.md
toc:          false
navigation:   false
clipboard:    false
---

I did some googling and found a program called AutoKey ([Autokey - Linux utility for text substitution hotkeys][4]) near the top of the list.

Rather than a hotkey using <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> I chose to assign the abbreviation `kz` which is automatically expanded into `<kbd></kbd>+`.

It is simply installed using:

``` 
sudo apt install autokey-gtk
```

It installs in Launcher and the screen is pretty simple to use:

[![Autokey][5]][5]


  [4]: https://saravananthirumuruganathan.wordpress.com/2010/04/14/autokey-linux-utility-for-text-substitution-hotkeys-and-desktop-automation/
  [5]: https://i.stack.imgur.com/gBAgI.png
