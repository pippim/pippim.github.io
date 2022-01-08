---
layout:       post
title:        >
    No option to mirror Displays on 18.04 - DELL M3800
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1097707
type:         Answer
tags:         18.04 multiple-monitors
created_date: 2018-12-01 16:50:36
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "8,554 "
accepted:     Accepted
uploaded:     2022-01-07 19:20:08
toc:          false
navigation:   false
clipboard:    false
---

From this answer: [How can I mirror one of the screens in a 3-monitor setup?](How can I mirror one of the screens in a 3-monitor setup?)p try using:

``` 
xrandr --output eDP-1-1 --output HDMI-1-2 --output HDMI-1-2 --same-as HDMI-1-1

```

In the accepted solution above, screen 3 is mirrored to screen 2 but the primary screen is not mirrored.


----------


Another option is switching to Unity desktop: [GNOME in Ubuntu 18.04 and multi monitor setup](GNOME in Ubuntu 18.04 and multi monitor setup)

Click the gear icon next to the `Sign In` button as shown below:

[![Ubuntu 5 DE.png][1]][1]

**Note:** Fresh 18.04 installs may need to install Unity Desktop. 16.04 Upgrades will likely have Unity in place by default. See: [How can I make Ubuntu 18.04 / 18.10 desktop use Unity (be like Ubuntu 14.04)?](How can I make Ubuntu 18.04 / 18.10 desktop use Unity (be like Ubuntu 14.04)?)

  [1]: https://i.stack.imgur.com/MoxHd.jpg
