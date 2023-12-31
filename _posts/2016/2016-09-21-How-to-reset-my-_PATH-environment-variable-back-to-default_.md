---
layout:       post
title:        >
    How to reset my $PATH environment variable back to default?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/827670
type:         Answer
tags:         bash environment-variables paths
created_date: 2016-09-21 01:12:24
edit_date:    
votes:        "0 "
favorites:    
views:        "34,756 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-21-How-to-reset-my-_PATH-environment-variable-back-to-default_.md
toc:          false
navigation:   false
clipboard:    false
---

I hope this is helpful:

``` 
rick@dell:~$ echo "$PATH"
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

I haven't changed my path (that I can recall) I notice "games" is in there but I don't play games so I assume it's a default. You might want to use this as a starting path to get you started on the right path, so to speak.

I'm using Ubuntu 16.04.

To add paths this link might be helpful: [unix-linux-adding-path][1].


  [1]: http://www.cyberciti.biz/faq/unix-linux-adding-path/
