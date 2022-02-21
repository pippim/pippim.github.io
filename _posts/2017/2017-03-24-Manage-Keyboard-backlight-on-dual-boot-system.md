---
layout:       post
title:        >
    Manage Keyboard backlight on dual boot system
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/896590
type:         Answer
tags:         dual-boot keyboard backlight
created_date: 2017-03-24 23:36:05
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "1,845 "
accepted:     
uploaded:     2022-02-21 09:31:49
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-03-24-Manage-Keyboard-backlight-on-dual-boot-system.md
toc:          false
navigation:   false
clipboard:    true
---

# Keyboard backlight

## Any vendor

From Arch Linux wiki: [You can control your computer keyboard backlight via the D-Bus interface][1]. The benefits of using it are that no modification to device files is required and it is vendor agnostic.

Here is an example implementation in Python 3. Place the following script in  `/usr/local/bin/` and make it executable. You can then map your keyboard shortcuts to run `/usr/local/bin/kb-light.py +` and `/usr/local/bin/kb-light.py -` to increase and decrease your keyboard backlight level.

Here is python code for `/usr/local/bin/kb-light.py`:




{% include copyHeader.html %}
``` python3
#!/usr/bin/env python3
# -*- coding: utf-8 -*-    
from sys import argv
import dbus


def kb_light_set(delta):
    bus = dbus.SystemBus()
    kbd_backlight_proxy = bus.get_object('org.freedesktop.UPower', '/org/freedesktop/UPower/KbdBacklight')
    kbd_backlight = dbus.Interface(kbd_backlight_proxy, 'org.freedesktop.UPower.KbdBacklight')

    current = kbd_backlight.GetBrightness()
    maximum = kbd_backlight.GetMaxBrightness()
    new = max(0, current + delta)

    if new >= 0 and new <= maximum:
        current = new
        kbd_backlight.SetBrightness(current)

    # Return current backlight level percentage
    return 100 * current / maximum

if __name__ == '__main__':
    if len(argv[1:]) == 1:
        if argv[1] == "--up" or argv[1] == "+":
            # ./kb-light.py (+|--up) to increment
            print(kb_light_set(1))
        elif argv[1] == "--down" or argv[1] == "-":
            # ./kb-light.py (-|--down) to decrement
            print(kb_light_set(-1))
        else:
            print("Unknown argument:", argv[1])
    else:
        print("Script takes exactly one argument.", len(argv[1:]), "arguments provided.")
```


  [1]: https://wiki.archlinux.org/index.php/Keyboard_backlight
