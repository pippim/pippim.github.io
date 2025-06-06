---
layout:       post
title:        >
    Laptop lid close doesn't suspend then the battery dies
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/831765
type:         Answer
tags:         16.04 suspend shutdown lid
created_date: 2016-09-30 23:12:23
edit_date:    
votes:        "7 "
favorites:    
views:        "6,935 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-30-Laptop-lid-close-doesn_t-suspend-then-the-battery-dies.md
toc:          false
navigation:   false
clipboard:    false
---

Looking at the link you followed to **lock the screen on lid close** you need to follow these steps to have a regular `suspend` when the lid is closed.


----------


## Set Ubuntu Power Settings


From the Launcher select the cog for `System Settings`. Click the icon `Power` and this screen appears:

[![Power Suspend][1]][1]

Look at the line `When lid is closed` and set the options as they appear above to `Suspend`.

Close the window.

----------


## Set systemd logind.conf settings


Invoke the `Terminal` by pressing <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>. Edit the systemd logind.conf file by typing:

``` 
gksu gedit /etc/systemd/logind.conf
```

Look for these two lines and change them to look like this:

``` 
HandleLidSwitch=suspend
HandleLidSwitchDocked=suspend
```

You might have to change `ignore` or `lock` to read `suspend`. You might have to remove a leading `#`.

Save the file and quit `gedit`. After ensuring no applications (like word processor, spreadsheet, etc.) have files open type into the terminal:

``` 
sudo reboot
```

Voila! everything is reversed and your system will operate as you expect.


  [1]: https://pippim.github.io/assets/img/posts/2016/eZgVI.png
