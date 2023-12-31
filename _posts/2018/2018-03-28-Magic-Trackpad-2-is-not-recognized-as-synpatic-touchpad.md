---
layout:       post
title:        >
    Magic Trackpad 2 is not recognized as synpatic touchpad
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1019930
type:         Answer
tags:         mouse touchpad multi-touch synaptics magic-trackpad
created_date: 2018-03-28 11:04:55
edit_date:    
votes:        "0 "
favorites:    
views:        "3,875 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-28-Magic-Trackpad-2-is-not-recognized-as-synpatic-touchpad.md
toc:          false
navigation:   false
clipboard:    false
---

There is a driver available for the **Apple Magic Trackpad 2** on [Github][1]. Highlights from the `README.md` file:

- `robbi5` created a `dkms` package with the driver that is known to work with `kernel 4.4.0-57-generic` on Ubuntu 16.04 LTS
- Used this driver in combination with the mtrack-driver, to make use of the multitouch feature (e.g. 2-finger-tap for right-click, etc)
- Right now the driver only works over USB. OP has submitted an official patch to `linux-input`.

  [1]: https://github.com/robotrovsky/Linux-Magic-Trackpad-2-Driver
