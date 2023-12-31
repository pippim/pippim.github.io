---
layout:       post
title:        >
    Play music even if the computer is closed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/818912
type:         Answer
tags:         lock-screen
created_date: 2016-08-31 01:22:29
edit_date:    
votes:        "0 "
favorites:    
views:        "2,357 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-08-31-Play-music-even-if-the-computer-is-closed.md
toc:          false
navigation:   false
clipboard:    false
---

The comment to your question has a link recommending using systemd's `#HandleLidSwitch=suspend` feature. However on my system (Ubuntu 16.04) this feature was disabled by the `#` at the beginning of the line. Ubuntu was handling Lid Close operations directly and circumventing systemd.

When you went into "Settings" you went to the "Brightness & Lock" screen but if you go to the "Power" screen instead you will see this:

[![Power do nothing on lid close][1]][1]

As in the screen above, set `When the lid is closed` to `Do Nothing` and that is exactly what Ubuntu does when you close the lid, ie your music continues playing as desired.


  [1]: https://i.stack.imgur.com/Tb1tv.png
