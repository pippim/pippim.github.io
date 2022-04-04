---
layout:       post
title:        >
    Laptop with external HDMI monitor: screen off/on loop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027247
type:         Answer
tags:         multiple-monitors display laptop hdmi
created_date: 2018-04-22 18:45:26
edit_date:    
votes:        "3 "
favorites:    
views:        "1,432 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-22-Laptop-with-external-HDMI-monitor_-screen-off_on-loop.md
toc:          false
navigation:   false
clipboard:    false
---

The easiest way is to lock your screen after inactivity but not turn the screen off.

As per this answer: [How do I prevent my display from turning off when screen is locked?][1], use this command:

``` 
gsettings set org.gnome.desktop.screensaver idle-activation-enabled false
```

Your screen will still lock after inactivity but the password prompt will stay up and the screen won't turn off.

Not the perfect solution but hopefully one that addresses your security concerns without the annoying loop.


  [1]: {% post_url /2017/2017-03-09-How-do-I-prevent-my-display-from-turning-off-when-screen-is-locked_ %}
