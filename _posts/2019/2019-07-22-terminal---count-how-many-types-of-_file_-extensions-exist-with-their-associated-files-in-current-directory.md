---
layout:       post
title:        >
    terminal - count how many types of (file) extensions exist with their associated files in current directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1160058
type:         Answer
tags:         command-line gnome-terminal
created_date: 2019-07-22 04:26:20
edit_date:    2019-07-22 04:35:45
votes:        "1 "
favorites:    
views:        "393 "
accepted:     Accepted
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-22-terminal---count-how-many-types-of-_file_-extensions-exist-with-their-associated-files-in-current-directory.md
toc:          false
navigation:   false
clipboard:    false
---

The duplicate candidate (deep down) has a close answer. Here it is modified:

``` 
find . -maxdepth 1 -type f | sed 's/.*\.//' | sort | uniq -c
```
