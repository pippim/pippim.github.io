---
layout:       post
title:        >
    How to reassign touchpad buttons to keyboard?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1050406
type:         Answer
tags:         keyboard shortcut-keys touchpad configuration customization
created_date: 2018-06-28 10:34:17
edit_date:    2018-06-28 10:50:02
votes:        "4 "
favorites:    
views:        "623 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-28-How-to-reassign-touchpad-buttons-to-keyboard_.md
toc:          false
navigation:   false
clipboard:    false
---

You can do this with Custom Keyboard shortcuts and `xdotool`. Install the tool using:

``` 
sudo apt install xdotool
```

Then go to *System Settings -> Keyboard -> Shortcuts -> Custom*:

[![keyboard click.png][1]][1]

- Click on <kbd>+</bkd> to create a new shortcut.
- Set Name to `Left Click`
- Set Command to `xdotool click 1`
- Click <kbd>Apply</kbd> button
- Click on `Accelerator` option and when prompted for key press `F1`

Repeat process for `Right Click` but assign command as `xdotool click 3` and set the accelerator as `F2`.

Now you can press <kbd>F1</kbd> for left click and <kbd>F2</kbd> for right click.


  [1]: https://pippim.github.io/assets/img/posts/2018/X47VJ.png
