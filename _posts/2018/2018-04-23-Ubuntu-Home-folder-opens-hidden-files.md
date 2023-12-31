---
layout:       post
title:        >
    Ubuntu Home folder opens hidden files
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027306
type:         Answer
tags:         14.10
created_date: 2018-04-23 01:35:52
edit_date:    
votes:        "0 "
favorites:    
views:        "126 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-23-Ubuntu-Home-folder-opens-hidden-files.md
toc:          false
navigation:   false
clipboard:    false
---

First check your current setting in the terminal using:

``` 
$ gsettings get org.gnome.nautilus.preferences show-hidden-files
true
```

Then open `nautilus` (file manager) and select `Edit` then `Preferences`. On the screen that appears uncheck the "show hidden and backup files" option:

[![nautilus hide system files.png][1]][1]

Exit Nautilus and confirm the setting has changed using the command line:

``` 
$ gsettings get org.gnome.nautilus.preferences show-hidden-files
false
```



  [1]: https://i.stack.imgur.com/A7eHk.png
