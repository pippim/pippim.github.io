---
layout:       post
title:        >
    High DPi screen xrandr scaling on ubuntu 18.04 LTS
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099471
type:         Answer
tags:         gnome 18.04 xorg display-resolution xrandr
created_date: 2018-12-09 01:01:25
edit_date:    
votes:        "2 "
favorites:    
views:        "3,777 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-09-High-DPi-screen-xrandr-scaling-on-ubuntu-18.04-LTS.md
toc:          false
navigation:   false
clipboard:    true
---

This answers both the OP's question and the other answer's bonus question.



Create a script using:

``` bash
sudo -H gedit /lib/systemd/system-sleep/scale
```

Copy these lines into `gedit`:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: scale
# PATH: /lib/systemd/system-sleep
# DESC: Reset Ethernet card after suspend, not working automatically
# DATE: Dec 8, 2018


MYNAME=$0

set_scale() {
   xrandr --output eDP-1 --scale 1.3x1.3
   xrandr --output eDP-1 --panning 2560x1440
}

/usr/bin/logger $MYNAME 'case=[' ${1}' ]'
case "${1}/${2}" in
   hibernate|suspend|pre*)
      ;;
   resume|thaw|post*)
      # sleep 2;
      set_scale;;
esac
```

Save the script and exit `gedit`.

Mark the script executable using:

``` bash
chmod a+x /lib/systemd/system-sleep/scale
```

The script will run every time you resume from suspend.

You can also have it run in your [startup applications][1] by adding an entry containing the command:

``` bash
/lib/systemd/system-sleep/scale post suspend
```

Startup Applications are run **after** you sign on.

  [1]: {% post_url /2016/2016-09-19-How-can-I-display-text-from-a-file-automatically-after-powering-up-my-computer_-in-text-editor-or-terminal_ %}
