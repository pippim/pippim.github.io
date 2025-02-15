---
layout:       post
title:        >
    Is it possible to update Ubuntu Live USB stick?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1000274
type:         Answer
tags:         networking dual-boot system-installation live-usb live-cd
created_date: 2018-01-27 04:20:11
edit_date:    
votes:        "3 "
favorites:    
views:        "9,753 "
accepted:     Accepted
uploaded:     2025-02-15 10:55:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-27-Is-it-possible-to-update-Ubuntu-Live-USB-stick_.md
toc:          false
navigation:   false
clipboard:    false
---

Boot with your live USB, open a terminal and use:

``` 
sudo apt install mkusb
```

Then run `mkusb` and create a new live USB with persistence using a new stick on a different USB port. Pay careful attention to using the correct USB port with the new USB stick.

Follow [these instructions][1].


  [1]: https://help.ubuntu.com/community/mkusb
