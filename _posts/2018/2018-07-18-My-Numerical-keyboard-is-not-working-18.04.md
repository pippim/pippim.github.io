---
layout:       post
title:        >
    My Numerical keyboard is not working 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1057404
type:         Answer
tags:         numlock
created_date: 2018-07-18 23:08:18
edit_date:    
votes:        "0 "
favorites:    
views:        "3,823 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-18-My-Numerical-keyboard-is-not-working-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I'm not sure about the `dconf` GUI method but, you can open a terminal with <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and try:

``` 
gsettings set org.gnome.settings-daemon.peripherals.keyboard numlock-state 'on'
```

I don't have a problem with my numlock so I'm not sure how to duplicate your situation.
