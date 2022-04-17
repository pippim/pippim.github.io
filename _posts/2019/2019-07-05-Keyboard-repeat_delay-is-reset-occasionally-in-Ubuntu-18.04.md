---
layout:       post
title:        >
    Keyboard repeat/delay is reset occasionally in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156053
type:         Answer
tags:         gnome 18.04 keyboard xorg
created_date: 2019-07-05 01:49:26
edit_date:    
votes:        "4 "
favorites:    
views:        "1,683 "
accepted:     
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-05-Keyboard-repeat_delay-is-reset-occasionally-in-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

You can create a script to automatically reset keyboard repeat rate during resume:



``` bash
#!/bin/bash

# NAME: keyrepeat
# PATH: /lib/systemd/system-sleep
# CALL: Called from SystemD automatically
# DATE: July 4, 2019.

# NOTE: https://askubuntu.com/questions/1086780/keyboard-repeat-delay-is-reset-occasionally-in-ubuntu-18-04

case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
        ;;
  post/*)
    echo "$0: Waking up from $2..."
    gsettings set org.gnome.desktop.peripherals.keyboard delay 250
        ;;
esac
```

Place the script in `/lib/systemd/system-sleep`.

Make it executable with:

``` bash
chmod a+x /lib/systemd/system-sleep/keyrepeat
```

Reboot and then every resume after suspend the command:

``` bash
gsettings set org.gnome.desktop.peripherals.keyboard delay 250
```

is automatically run.
