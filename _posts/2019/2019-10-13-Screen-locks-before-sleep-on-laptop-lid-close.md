---
layout:       post
title:        >
    Screen locks before sleep on laptop lid close
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1180734
type:         Answer
tags:         suspend power-management laptop
created_date: 2019-10-13 20:57:05
edit_date:    
votes:        "0 "
favorites:    
views:        "114 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-13-Screen-locks-before-sleep-on-laptop-lid-close.md
toc:          false
navigation:   false
clipboard:    false
---

## Set systemd logind.conf settings


Invoke the `Terminal` by pressing <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>. Edit the systemd logind.conf file by typing:

``` 
sudo -H gedit /etc/systemd/logind.conf
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

