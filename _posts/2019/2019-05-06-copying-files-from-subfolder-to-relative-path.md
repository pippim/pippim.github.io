---
layout:       post
title:        >
    copying files from subfolder to relative path
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1141040
type:         Answer
tags:         command-line bash files
created_date: 2019-05-06 19:36:51
edit_date:    2019-05-06 19:44:57
votes:        "1 "
favorites:    
views:        "775 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-06-copying-files-from-subfolder-to-relative-path.md
toc:          false
navigation:   false
clipboard:    false
---

Use:

``` 
mv askubuntu/* .
```

`mv` is the move command vary similar to `cp` copy command except it removes file at same time. It's actually more efficient because the file isn't actually copied and removed but rather renamed.

`.` is shorthand for current directory ie `/home/my_username/`
