---
layout:       post
title:        >
    Why does my laptop suspend after 5 minutes?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/849893
type:         Answer
tags:         suspend power-management
created_date: !!str "2016-11-16 00:18:08"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "159"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

You mentioned you checked the power options screen so I'll put add this one even though I don't think it is effecting you, but which you can check nonethelesss:

[![enter image description here][1]][1]

The only thing I can think of now are gnome settings which you can force off via the terminal:

``` 
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type nothing
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout 0
gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-battery-type nothing

```

The value of `0` seconds on lines 1 and 3 turns the function off. The `nothing` feature on lines 2 and 4 are like hitting it was a hammer twice.

If problem persists there are other things in `systemd` to look at such as `xautolock` but the steps above are the most obvious ones to try first.

  [1]: https://i.stack.imgur.com/WNp4E.png
