---
layout:       post
title:        >
    Can't find lock computer option in ubuntu 18
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1061308
type:         Answer
tags:         18.04 login-screen lock-screen
created_date: !!str "2018-08-01 04:25:20"
edit_date:    !!str ""
votes:        !!str "4"
favorites:    
views:        !!str "6,484"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

As per this answer: https://askubuntu.com/questions/1034196/where-is-the-power-off-button-in-ubuntu-18-04-lts/1034271#1034271 try:

``` 
gsettings set org.gnome.desktop.lockdown disable-lock-screen false

```
