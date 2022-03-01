---
layout:       post
title:        >
    How to standby a monitor using xset in multi monitor setup?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1128315
type:         Answer
tags:         xorg multiple-monitors display xrandr xset
created_date: 2019-03-24 16:43:11
edit_date:    
votes:        "4 "
favorites:    
views:        "3,358 "
accepted:     
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-03-24-How-to-standby-a-monitor-using-xset-in-multi-monitor-setup_.md
toc:          false
navigation:   false
clipboard:    true
---

For years I had my laptop setup such that when lid is closed laptop would suspend and external monitors would go blank.

For your reason of wanting to watch a video for 90 minutes on external monitor and have laptop screen go blank I changed lid close option to "Do Nothing":

- Advantage: When I close Laptop lid all Laptop windows go below full screen video.
- Advantage: When I open Laptop lid windows are restored and are no longer below full screen video.
- Disadvantage: I have to make video non-full screen to access top bar menu to select suspend from gear menu.
- Advantage: When system is suspended by menu on external monitor, opening laptop lid still resumes system.


----------

I'm not using DPMS for external monitors but you could check your settings with `xset q` command:

{% include copyHeader.html %}
``` 
$ xset q
Keyboard Control:
  auto repeat:  on    key click percent:  0    LED mask:  00000002
  XKB indicators:
    00: Caps Lock:   off    01: Num Lock:    on     02: Scroll Lock: off
    03: Compose:     off    04: Kana:        off    05: Sleep:       off
    06: Suspend:     off    07: Mute:        off    08: Misc:        off
    09: Mail:        off    10: Charging:    off    11: Shift Lock:  off
    12: Group 2:     off    13: Mouse Keys:  off
  auto repeat delay:  500    repeat rate:  33
  auto repeating keys:  00ffffffdffffbbf
                        fadfffefffedffff
                        9fffffffffffffff
                        fff7ffffffffffff
  bell percent:  50    bell pitch:  400    bell duration:  100
Pointer Control:
  acceleration:  5/1    threshold:  5
Screen Saver:
  prefer blanking:  yes    allow exposures:  yes
  timeout:  0    cycle:  0
Colors:
  default colormap:  0xb3    BlackPixel:  0x0    WhitePixel:  0xffffff
Font Path:
  /usr/share/fonts/X11/misc,/usr/share/fonts/X11/Type1,built-ins
DPMS (Energy Star):
  Standby: 0    Suspend: 0    Off: 0
  DPMS is Disabled
```

Notice these lines:

``` 
Screen Saver:
  prefer blanking:  yes
```

- You would likely want `prefer blanking:  no`

Also notice these lines:

``` 
DPMS (Energy Star):
  Standby: 0    Suspend: 0    Off: 0
  DPMS is Disabled
```

- You would likely want `DPMS is enabled` to set monitor to `Standby` when desired.

Hopefully other users have used these options and post a detailed answer for you.
