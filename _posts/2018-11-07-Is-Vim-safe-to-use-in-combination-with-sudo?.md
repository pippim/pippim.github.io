---
layout:       post
title:        Is Vim safe to use in combination with sudo?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1090647
type:         Answer
tags:         sudo vim
created_date: 2018-11-07 00:46:21
edit_date:    
votes:        2
favorites:    
views:        5,055
accepted:     
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

The link is very old (2013). It recommends using `gksudo` or `gksu` for graphical applications but both of those are becoming obsolete. Later on the accepted answer also suggests `sudo -H` though.

The general consensus in the **Ask Ubuntu** community recently is to use:

``` 
sudo -H gedit /path/to/filename

```

The only problem remains that `sudo` doesn't have a profile for tab settings, extensions, word wrap, font name, font size, etc. You can inherit these from your user profile though with a wrapper script like this: https://askubuntu.com/questions/92655/how-can-i-sync-my-root-gedit-with-my-user-gedits-preferences/1047405#1047405
