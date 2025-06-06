---
layout:       post
title:        >
    Is there a linux equivalent to Mac's "Shake to Find Cursor"?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/484332
type:         Answer
tags:         linux-mint x11 mouse accessibility
created_date: 2018-11-27 00:30:12
edit_date:    
votes:        "2 "
favorites:    
views:        "7,206 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-27-Is-there-a-linux-equivalent-to-Mac_s-_Shake-to-Find-Cursor__.md
toc:          false
navigation:   false
clipboard:    false
---

If you want to find your mouse pointer in a sea of pixels you can tap and release the <kbd>Control</kbd> key.

If you are running Ubuntu w/Unity Desktop or Ubuntu w/Gnome Desktop run: 

``` 
gsettings set org.gnome.settings-daemon.peripherals.mouse locate-pointer true
```

If you no longer want mouse pointer revealed reverse it's effect with:

``` 
gsettings set org.gnome.settings-daemon.peripherals.mouse locate-pointer false
```

Here's what it looks like enabled:

[![gnome locate mouse][1]][1]


  [1]: https://pippim.github.io/assets/img/posts/2018/xZLsN.gif
