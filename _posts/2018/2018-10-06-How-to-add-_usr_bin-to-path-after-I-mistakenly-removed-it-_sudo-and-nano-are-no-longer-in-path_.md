---
layout:       post
title:        >
    How to add /usr/bin to path after I mistakenly removed it (sudo and nano are no longer in path)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1081545
type:         Answer
tags:         permissions sudo environment-variables bashrc
created_date: 2018-10-06 20:52:42
edit_date:    2023-01-10 17:08:00
votes:        "6 "
favorites:    
views:        "2,607 "
accepted:     Accepted
uploaded:     2023-09-19 12:47:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-06-How-to-add-_usr_bin-to-path-after-I-mistakenly-removed-it-_sudo-and-nano-are-no-longer-in-path_.md
toc:          false
navigation:   false
clipboard:    false
---

You can prefix the commands with the path:

``` 
/bin/nano ~/.bashrc
```

or (for files that need superuser privilege to edit)

``` 
/usr/bin/sudo nano /etc/bash.bashrc
```
