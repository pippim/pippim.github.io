---
layout:       post
title:        >
    svn: Unable to connect / No repository found
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/837663
type:         Answer
tags:         svn
created_date: 2016-10-16 01:41:19
edit_date:    
votes:        "0 "
favorites:    
views:        "31,469 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-16-svn_-Unable-to-connect-_-No-repository-found.md
toc:          false
navigation:   false
clipboard:    false
---

Edit your "servers" configuration file to indicate which proxy to use. 

The file location is in "~/.subversion"

Uncomment and set the following lines:

``` 
#http-proxy-host=my.proxy
#http-proxy-port=80
#http-proxy-username=[username]
#http-proxy-password=[password]
```

I don't have your software so cannot test it myself but I hope this helps.
