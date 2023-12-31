---
layout:       post
title:        >
    slow boot boot 19.10 (tried almost everything)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187142
type:         Answer
tags:         boot dual-boot 19.10
created_date: 2019-11-08 02:08:10
edit_date:    
votes:        "0 "
favorites:    
views:        "5,451 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-08-slow-boot-boot-19.10-_tried-almost-everything_.md
toc:          false
navigation:   false
clipboard:    false
---

As described in this answer:

- [What does NetworkManager-wait-online.service do?]({% post_url /2018/2018-03-23-What-does-NetworkManager-wait-online.service-do_ %})

A considerable amount of your boot time can be saved with the command:

``` 
sudo systemctl disable NetworkManager-wait-online.service
```

