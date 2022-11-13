---
layout:       post
title:        >
    Disable suspend after screen lock
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/840267
type:         Answer
tags:         suspend laptop power-management lock-screen
created_date: 2016-10-21 23:20:42
edit_date:    
votes:        "3 "
favorites:    
views:        "3,038 "
accepted:     Accepted
uploaded:     2022-11-13 08:20:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-21-Disable-suspend-after-screen-lock.md
toc:          false
navigation:   false
clipboard:    false
---

You can try this. Open the terminal and type:

``` 
gksu gedit /etc/systemd/logind.conf
```

Set these two lines to look like this:

``` 
HandleLidSwitch=suspend
HandleLidSwitchDocked=ignore
```

Save the file, reboot and test it under the two environments (docked and undocked).

If unacceptable results, change your power settings to "Do nothing" on the lid close event where you have it set to "Suspend" now. You shouldn't have to reboot to test your two environments again.
