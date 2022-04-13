---
layout:       post
title:        >
    Can't find lock computer option in ubuntu 18
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1061308
type:         Answer
tags:         18.04 login-screen lock-screen
created_date: 2018-08-01 04:25:20
edit_date:    
votes:        "4 "
favorites:    
views:        "6,497 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-01-Can_t-find-lock-computer-option-in-ubuntu-18.md
toc:          false
navigation:   false
clipboard:    false
---

As per this answer: [Where is the power off button in Ubuntu 18.04 LTS ?](Where is the power off button in Ubuntu 18.04 LTS ?)1 try:

``` 
gsettings set org.gnome.desktop.lockdown disable-lock-screen false
```
