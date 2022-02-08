---
layout:       post
title:        >
    Messed up my PATH environment variable and can't login to desktop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1102976
type:         Answer
tags:         18.04 environment-variables gnome-session
created_date: 2018-12-19 00:50:22
edit_date:    
votes:        "2 "
favorites:    
views:        "7,958 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-19-Messed-up-my-PATH-environment-variable-and-can_t-login-to-desktop.md
toc:          false
navigation:   false
clipboard:    false
---

Enter this command:

``` 
nano /etc/environment
```

Make the first line read:

``` 
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:"
```

Press <kbd>Ctrl</kbd>+<kbd>O</kbd> to save the file.

Press <kbd>Ctrl</kbd>+<kbd>X</kbd> to exit.

Type `reboot` to restart your computer.
