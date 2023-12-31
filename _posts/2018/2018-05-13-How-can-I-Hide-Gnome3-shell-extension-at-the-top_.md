---
layout:       post
title:        >
    How can I Hide Gnome3 shell extension at the top?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035799
type:         Answer
tags:         18.04 gnome-shell gnome-shell-extension vnstat conky
created_date: 2018-05-13 18:17:47
edit_date:    
votes:        "0 "
favorites:    
views:        "246 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-13-How-can-I-Hide-Gnome3-shell-extension-at-the-top_.md
toc:          false
navigation:   false
clipboard:    false
---

If you don't want **Net Speed** in the systray and are open to considering another option, might I suggest `conky`? It's a light weight system monitor that is highly configurable and immensely popular. You can almost say it has a cult following:

[![Conky Network.gif][1]][1]

Near the bottom is a real time display of network speed including graphs. Also `vnstat` is used to list total network traffic for today, yesterday, this week and this month. You can set the month to your ISP's billing cycle, ie April 16 to May 16.

To install conky use:

``` 
sudo apt install conky
```

To find a plethora of custom setups for `conky` see [Ubuntu Forums][2]. 


  [1]: https://i.stack.imgur.com/sDo0f.gif
  [2]: https://ubuntuforums.org/showthread.php?t=281865
