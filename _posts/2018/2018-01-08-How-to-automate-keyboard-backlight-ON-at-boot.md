---
layout:       post
title:        >
    How to automate keyboard backlight ON at boot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/993415
type:         Answer
tags:         boot keyboard backlight
created_date: 2018-01-08 03:41:42
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-04 14:28:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-08-How-to-automate-keyboard-backlight-ON-at-boot.md
toc:          false
navigation:   false
clipboard:    false
---

# Using "Startup Applications" instead of `/etc/rc.local`

- Select the first option on your Launcher called Dash. Then type "startup" and a screen similar to this will appear:
[![Dash Startup applications.png][1]][1]

- Select the option "Startup Applications" and a screen similar to this will appear:
[![Startup Applications 2.png][2]][2]

- Select `Add` and this screen will appear:
[![Startup Applications 3.png][3]][3]

- Make sure you enter the command as: /usr/bin/xset led 3
- I entered the comment as: [Ubuntu 16.04 regular crash, Compiz segfault, error 4 in i965_dri.so, Fresh install](Ubuntu 16.04 regular crash, Compiz segfault, error 4 in i965_dri.so, Fresh install)a but you don't need to.

## Notes

I can't test this on my system because the Laptop's built-in keyboard and wireless keyboard both light up automatically.

You can't put `xrandr` commands in `/etc/rc.local` because it runs before a user logs in. `xrandr` commands can only be used after the user logs on.

  [1]: https://i.sstatic.net/HynOK.png
  [2]: https://i.sstatic.net/XKOCo.png
  [3]: https://i.sstatic.net/Q0olP.png
