---
layout:       post
title:        Execute sudo without Password?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1037177
type:         Answer
tags:         command-line password sudo root
created_date: 2018-05-17 00:12:01
edit_date:    
votes:        5
favorites:    
views:        775,134
accepted:     
uploaded:     2021-12-29 16:51:17
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
