---
layout:       post
title:        >
    Is it possible to update Ubuntu Live USB stick?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1000274
type:         Answer
tags:         networking dual-boot system-installation live-usb live-cd
created_date: !!str "2018-01-27 04:20:11"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "5,134"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
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
