---
layout:       post
title:        >
    How to take a serial port connection via USB online?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1170099
type:         Answer
tags:         usb uefi serial-port
created_date: 2019-09-01 21:21:02
edit_date:    2019-09-01 22:23:08
votes:        "2 "
favorites:    
views:        "7,283 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-01-How-to-take-a-serial-port-connection-via-USB-online_.md
toc:          false
navigation:   false
clipboard:    false
---

Some good reading is available from [Official Ubuntu Documentation][1]:

## Alternative serial client: screen

GNU screen actually is a very capable serial terminal.

To install:

``` 
sudo apt-get install screen
```

To start:

``` 
sudo screen /dev/ttyUSB0 n
```

**Some additional tips:**  
1. adjust the `n` to what you need:

* Start without a number on the first try; it might auto-negotiate flawlessly
* then use 115200, 57600, 38400, 19200, 9600, 4800,  2400, 1200 and stop when it starts working.
* If you're [a purist](https://chat.stackexchange.com/transcript/message/51555021#51555021) and don't like using `sudo` for this or need to hand this out to users not having access to `sudo`, add them to the `dialout` group.

To end the session, use <kbd>Ctrl</kbd>-<kbd>A</kbd> or <kbd>Shift</kbd>-<kbd>K</kbd>.

  [1]: https://help.ubuntu.com/community/SerialConsoleHowto
