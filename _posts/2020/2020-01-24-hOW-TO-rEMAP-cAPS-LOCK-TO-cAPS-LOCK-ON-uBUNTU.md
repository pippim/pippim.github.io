---
layout:       post
title:        >
    hOW TO rEMAP cAPS-LOCK TO cAPS-LOCK ON uBUNTU
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1205502
type:         Answer
tags:         keyboard shortcut-keys
created_date: !!str "2020-01-24 20:44:31"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "371"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
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
