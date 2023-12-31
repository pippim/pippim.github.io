---
layout:       post
title:        >
    Computer shutting down as if the adapter was unplugged
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1182483
type:         Answer
tags:         suspend power-management shutdown battery
created_date: 2019-10-20 18:20:13
edit_date:    
votes:        "1 "
favorites:    
views:        "1,036 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-20-Computer-shutting-down-as-if-the-adapter-was-unplugged.md
toc:          false
navigation:   false
clipboard:    false
---

There could be multiple issues to solve here but this is one thing to try:

Use the command:

``` 
gsettings get org.gnome.settings-daemon.plugins.power critical-battery-action
```

If the result is not `suspend` then use the command:

``` 
gsettings set org.gnome.settings-daemon.plugins.power critical-battery-action 'suspend'
```

This way when your battery is critically low you won't loose your work due to a shutdown. Then plug in your laptop and resume from suspend. You don't want your laptop left unplugged in suspend mode too long because the battery will still eventually die and you will be left in a state as if an abrupt power off had been performed.

A fully-charged battery might only last two days with laptop suspended and unplugged:

- [Sleep mode drains battery very fast](Sleep mode drains battery very fast)
