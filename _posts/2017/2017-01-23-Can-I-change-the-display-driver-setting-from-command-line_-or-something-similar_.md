---
layout:       post
title:        >
    Can I change the display driver setting from command line, or something similar?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/875137
type:         Answer
tags:         drivers nvidia graphics display 16.10
created_date: 2017-01-23 05:30:44
edit_date:    
votes:        "0 "
favorites:    
views:        "84 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-23-Can-I-change-the-display-driver-setting-from-command-line_-or-something-similar_.md
toc:          false
navigation:   false
clipboard:    false
---

Switching from nVidia graphics to Intel Graphics is a common solution.

At the login screen use <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> to bring up console. Now Login with your user ID and password and then use:

``` 
sudo service lightdm stop
sudo prime-switch intel
sudo service lightdm start
```

Intel driver should now be loaded. Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F7</kbd> to bring up regular login screen.
