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
views:        "6,484 "
accepted:     
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

As per this answer: [https://askubuntu.com/questions/1034196/where-is-the-power-off-button-in-ubuntu-18-04-lts/1034271#103427](https://askubuntu.com/questions/1034196/where-is-the-power-off-button-in-ubuntu-18-04-lts/1034271#103427)1 try:

``` 
gsettings set org.gnome.desktop.lockdown disable-lock-screen false

```
