---
layout:       post
title:        >
    How to diagnose Software Updater issue? It just pops up a window with no content
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1193304
type:         Answer
tags:         update-manager
created_date: 2019-12-02 20:44:38
edit_date:    
votes:        "1 "
favorites:    
views:        "30 "
accepted:     Accepted
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

Simulate what GUI does in your terminal and look for error messages:

``` 
sudo apt update && sudo apt upgrade

```
