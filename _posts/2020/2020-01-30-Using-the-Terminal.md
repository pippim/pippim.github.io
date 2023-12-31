---
layout:       post
title:        >
    Using the Terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1206913
type:         Answer
tags:         dual-boot mount fstab
created_date: 2020-01-30 18:23:37
edit_date:    2020-01-31 00:27:47
votes:        "1 "
favorites:    
views:        "88 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-01-30-Using-the-Terminal.md
toc:          false
navigation:   false
clipboard:    false
---

If your current method of editing the file is failing. You can try using:

``` 
sudo -H gedit /etc/fstab
```

This method may work or at the very least you will get a different error message which will shed more light on why you can't edit the file with the current method.
