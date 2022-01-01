---
layout:       post
title:        >
    Equivalent to xdotool for Wayland
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1299008
type:         Answer
tags:         scripts wayland xdotool
created_date: !!str "2020-12-10 12:00:19"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "5,974"
accepted:     
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

There is the [ydotool][1] package for wayland:

## Package ydotool

Generic command-line automation tool (no X!)

https://github.com/ReimuNotMoe/ydotool

Performs some of the functions of xdotool(1) without requiring X11 -
however, it generally requires root permission (to open /dev/uinput)

Currently implemented command(s):

- type - Type a string
- key - Press keys
- mousemove - Move mouse pointer to absolute position
- mousemove_relative - Move mouse pointer to relative position
- mouseup - Generate mouse up event
- mousedown - Generate mouse down event
- click - Click on mouse buttons
- recorder - Record/replay input events

N.B. optionally, you can start the ydotoold daemon with:

- systemctl enable ydotool
- systemctl start ydotool

Version: 0.1.9

  [1]: https://www.mankier.com/package/ydotool
