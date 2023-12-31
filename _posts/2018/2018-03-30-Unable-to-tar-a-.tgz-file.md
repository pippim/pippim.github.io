---
layout:       post
title:        >
    Unable to tar a .tgz file
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1020696
type:         Answer
tags:         nvidia software-installation tar
created_date: 2018-03-30 20:27:20
edit_date:    
votes:        "1 "
favorites:    
views:        "5,139 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-30-Unable-to-tar-a-.tgz-file.md
toc:          false
navigation:   false
clipboard:    false
---

As per this [SuperUser][1] answer:

> If you are using the `-v` flag, try leaving it off. This should reduce  
> the output and let you see what is going on.  

I'll see if I can find a better link. In the meantime change your command to:

``` 
tar -xfz cudnn-9.0-linux-x64-v7.tgz
```

Now you can see all the error messages. Then adjust your question accordingly or answer your own question using the new information.

  [1]: https://superuser.com/questions/169195/tar-exiting-with-failure-status-due-to-previous-errors?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
