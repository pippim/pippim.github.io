---
layout:       post
title:        >
    How can I add screensaver to startup applications?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1187400
type:         Answer
tags:         xscreensaver
created_date: 2019-11-08 23:31:18
edit_date:    
votes:        "1 "
favorites:    
views:        "1,548 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-08-How-can-I-add-screensaver-to-startup-applications_.md
toc:          false
navigation:   false
clipboard:    false
---

`xscreensaver` used to be the default screen saver in gnome and unity. A few years ago gnome came out with "environmentally friendly" screen saver that turns the screen black. Subsequently they broke xscreensaver with all it's fancy screen effects.

To use xscreensaver you must remove gnome-screensaver. From:

- [How to Install, Change, Autostart Screensaver in Ubuntu][1]

To summarize the commands:

``` 
sudo apt-get install xscreensaver xscreensaver-gl-extra xscreensaver-data-extra
sudo apt-get remove gnome-screensaver
xscreensaver -nosplash
```

Visit the link for screenshots and instructions of adding to autostart.

Also note after upgrades you may have to remove `gnome-screensaver` again.

  [1]: https://www.debugpoint.com/2018/08/install-change-autostart-setup-screensaver-ubuntu-linux/
