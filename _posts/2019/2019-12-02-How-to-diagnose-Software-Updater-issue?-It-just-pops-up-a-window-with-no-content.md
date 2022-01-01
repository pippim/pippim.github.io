---
layout:       post
title:        >
    How to diagnose Software Updater issue? It just pops up a window with no content
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1193304
type:         Answer
tags:         update-manager
created_date: !!str "2019-12-02 20:44:38"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "30"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

Simulate what GUI does in your terminal and look for error messages:

``` 
sudo apt update && sudo apt upgrade

```
