---
layout:       post
title:        Is it possible to update Ubuntu Live USB stick?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1000274
type:         Answer
tags:         networking dual-boot system-installation live-usb live-cd
created_date: 2018-01-27 04:20:11
edit_date:    
votes:        2
favorites:    
views:        5,177
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
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
