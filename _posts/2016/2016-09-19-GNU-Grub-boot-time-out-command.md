---
layout:       post
title:        >
    GNU Grub boot time out command
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/826784
type:         Answer
tags:         grub2 timeout gnu
created_date: 2016-09-19 05:13:25
edit_date:    
votes:        "1 "
favorites:    
views:        "589 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-19-GNU-Grub-boot-time-out-command.md
toc:          false
navigation:   false
clipboard:    false
---

Simply press <kbd>Enter</kbd> to abort the countdown and start the highlighted option immediately.

From within Ubuntu, you can change the countdown timer value by opening the terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and then typing:

``` 
gksu gedit /etc/default/grub
```

to edit the configuration file.

Search for the line:

``` 
GRUB_TIMEOUT=30
```

and change it to:

``` 
GRUB_TIMEOUT=5
```

Then save the configuration file and exit the editor.

Next you need to compile the configuration file with:

``` 
sudo update-grub
```

then type `exit` to close the terminal.

When you boot again there will be a 5 second countdown instead of 30 seconds.
