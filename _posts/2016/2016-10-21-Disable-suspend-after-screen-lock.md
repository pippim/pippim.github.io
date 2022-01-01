---
layout:       post
title:        >
    Disable suspend after screen lock
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/840267
type:         Answer
tags:         suspend laptop power-management lock-screen
created_date: !!str "2016-10-21 23:20:42"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "2,637"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
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
