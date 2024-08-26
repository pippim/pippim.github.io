---
layout:       post
title:        >
    How can I remap caps-lock to caps-lock after unmapping it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1205502
type:         Answer
tags:         keyboard shortcut-keys
created_date: 2020-01-24 20:44:31
edit_date:    
votes:        "1 "
favorites:    
views:        "927 "
accepted:     Accepted
uploaded:     2024-08-26 05:22:34
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-01-24-How-can-I-remap-caps-lock-to-caps-lock-after-unmapping-it_.md
toc:          false
navigation:   false
clipboard:    false
---

From [Linux Mint][1]:

``` 
sudo apt install xdotool
```

Then toggle the caps lock key with this command:

``` 
xdotool key Caps_Lock
```

Run this command again to turn caps lock off.


  [1]: https://securitronlinux.com/bejiitaswrath/how-to-toggle-the-caps-lock-key-with-the-command-line-in-linux-mint/
