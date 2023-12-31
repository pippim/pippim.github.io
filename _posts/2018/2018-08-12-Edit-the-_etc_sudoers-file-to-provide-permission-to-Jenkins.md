---
layout:       post
title:        >
    Edit the /etc/sudoers file to provide permission to Jenkins
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064750
type:         Answer
tags:         permissions sudo gedit jenkins
created_date: 2018-08-12 19:24:32
edit_date:    
votes:        "0 "
favorites:    
views:        "7,516 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-Edit-the-_etc_sudoers-file-to-provide-permission-to-Jenkins.md
toc:          false
navigation:   false
clipboard:    false
---

When you run `gedit`, `nautilus` and many other applications from the command line you will see these fake error messages often.

To confirm your changes took effect use the command:

``` 
sudo cat /etc/sudoers
```

You will see `gedit` did save the changes.
