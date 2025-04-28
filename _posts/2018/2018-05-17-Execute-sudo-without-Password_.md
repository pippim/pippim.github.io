---
layout:       post
title:        >
    Execute sudo without Password?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037177
type:         Answer
tags:         command-line password sudo root
created_date: 2018-05-17 00:12:01
edit_date:    
votes:        "12 "
favorites:    
views:        "1,187,665 "
accepted:     
uploaded:     2025-04-28 15:55:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-17-Execute-sudo-without-Password_.md
toc:          false
navigation:   false
clipboard:    false
---

From [Super User][1] comes a good answer:

Use the -S switch which reads the password from STDIN:

``` 
echo <password> | sudo -S <command>
```

Replace `<password>` with your password.



  [1]: https://superuser.com/a/67766/662962
