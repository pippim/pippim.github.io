---
layout:       post
title:        >
    Constant flash player problems
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/821423
type:         Answer
tags:         google-chrome flash
created_date: 2016-09-05 22:07:21
edit_date:    2016-09-05 22:19:15
votes:        "4 "
favorites:    
views:        "1,633 "
accepted:     
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-05-Constant-flash-player-problems.md
toc:          false
navigation:   false
clipboard:    false
---

This is a shot in the dark based on a similar problem reported in February 2013. First if Chrome is running close it. Then open the terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and type:

``` 
chmod -R 0700 ~/.config/google-chrome/PepperFlash
rm -rf ~/.config/google-chrome/PepperFlash
```

This will cause the working copy of Flash configuration to be deleted and the next time you start Chrome it is rebuilt from defaults. Type `exit` to close the Terminal.

The other option is to purge and reinstall Chrome which it sounds like you've already done.

When I ran the commands on my Ubuntu 16.04 version the PepperFlash file was removed as expected. However when I started a TV show that uses flash the file wasn't recreated but yet the TV show worked normally. The Pepperflash file must have been leftover from an older version of Chrome which is no longer needed in Chrome version 53.0.2785.92 (64-bit) that I'm using.

Hopefully it works for you but as I prefaced, "it's a shot in the dark".
