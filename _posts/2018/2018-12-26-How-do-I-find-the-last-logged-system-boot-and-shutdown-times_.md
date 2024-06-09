---
layout:       post
title:        >
    How do I find the last logged system boot and shutdown times?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1104768
type:         Answer
tags:         boot shutdown logging events
created_date: 2018-12-26 23:51:42
edit_date:    
votes:        "3 "
favorites:    
views:        "36,224 "
accepted:     
uploaded:     2024-06-09 08:36:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-26-How-do-I-find-the-last-logged-system-boot-and-shutdown-times_.md
toc:          false
navigation:   false
clipboard:    false
---

For a GUI method you can use `hardinfo` as described here: [Does Ubuntu have a &quot;device manager&quot; equivalent? And what is an easy way to access USB drives?](Does Ubuntu have a &quot;device manager&quot; equivalent? And what is an easy way to access USB drives?)

Under the section `Boots` you will see this:

[![Hardinfo boot log.png][1]][1]

Installation is straight forward using:

``` 
sudo apt install hardinfo
```

  [1]: https://i.sstatic.net/P94m4.png
