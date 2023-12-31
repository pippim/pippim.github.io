---
layout:       post
title:        >
    Updates install error
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1092654
type:         Answer
tags:         updates error-handling
created_date: 2018-11-13 20:14:44
edit_date:    2018-11-13 20:33:44
votes:        "1 "
favorites:    
views:        "80 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-13-Updates-install-error.md
toc:          false
navigation:   false
clipboard:    false
---

In  your terminal type:

``` 
sudo dpkg --configure -a
```

Copy any errors that appear with your mouse and post them into your question.

If no errors then try your original command again.


----------

From Linux Mint forums this answer: [Re: _cache->open failed. Cannot update.][1]

> Worked for me!  
>   
> For everyone else who comes later the command to fix this issue is:  
>   
>     sudo rm /var/lib/apt/lists/* -vf  


  [1]: https://forums.linuxmint.com/viewtopic.php?t=74524
