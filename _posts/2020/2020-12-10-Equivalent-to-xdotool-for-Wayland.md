---
layout:       post
title:        >
    Equivalent to xdotool for Wayland
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1299008
type:         Answer
tags:         scripts wayland xdotool
created_date: 2020-12-10 12:00:19
edit_date:    2022-09-07 19:05:23
votes:        "9 "
favorites:    
views:        "10,357 "
accepted:     Accepted
uploaded:     2023-09-12 15:48:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-12-10-Equivalent-to-xdotool-for-Wayland.md
toc:          false
navigation:   false
clipboard:    false
---

There is the [ydotool][1] package for Wayland:

## Package ydotool

Generic Linux command-line automation tool (no X!)

[https://github.com/ReimuNotMoe/ydotool](https://github.com/ReimuNotMoe/ydotool)

Performs some of the functions of xdotool(1) without requiring X11 -
however, it generally requires root permission (to open /dev/uinput)

Currently implemented command(s):

- `type` - Type a string
- `key` - Press keys
- `mousemove` - Move mouse pointer to absolute position
- `click` - Click on mouse buttons

N.B. optionally, you can enable and start the ydotoold daemon with:

1. `systemctl enable ydotool`
1. `systemctl start ydotool`


  [1]: https://www.mankier.com/package/ydotool
