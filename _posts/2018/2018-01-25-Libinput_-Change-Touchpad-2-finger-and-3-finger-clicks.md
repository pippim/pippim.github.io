---
layout:       post
title:        >
    Libinput: Change Touchpad 2 finger and 3 finger clicks
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/999704
type:         Answer
tags:         touchpad hardware synaptics libinput
created_date: 2018-01-25 11:41:13
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "5,023 "
accepted:     
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-25-Libinput_-Change-Touchpad-2-finger-and-3-finger-clicks.md
toc:          false
navigation:   false
clipboard:    false
---

From [this page][1]:

## Button re-mapping

Swapping two- and three-finger tap for a touchpad is a straight forward example. Instead of the default three-finger tap for pasting you can configure two-finger tap pasting by setting the `TappingButtonMap` option in your Xorg configuration file. To set 1/2/3-finger taps to left/right/middle set `TappingButtonMap` to `lrm`, for left/middle/right set it to `lmr`.

`/etc/X11/xorg.conf.d/30-touchpad.conf`:

``` 
Section "InputClass"
    Identifier "touchpad"
    Driver "libinput"
    MatchIsTouchpad "on"
    Option "Tapping" "on"
    Option "TappingButtonMap" "lmr"
EndSection
```

Remember to remove `MatchIsTouchpad "on"` if your device is not a touchpad and adjust the Identifier accordingly.

You might want to read the entire page linked above as it covers many interesting topics such as running synaptics and libinput in parallel.


  [1]: https://wiki.archlinux.org/index.php/Libinput
