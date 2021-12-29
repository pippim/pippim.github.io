---
layout:       post
title:        dell-wmi-dkms errors when updating
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/939737
type:         Answer
tags:         16.04 wireless dell
created_date: 2017-07-25 20:22:20
edit_date:    
votes:        1
favorites:    
views:        560
accepted:     Accepted
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

# Error messages

To address your immediate concerns you have nothing to worry about. The WMI hotkeys are not needed for WiFi to function. 

# Date of WMI updates

To address comments posted above; although your Dell-WMI compiled binaries haven't been updated for 9 years, the source code was updated 2 years ago:

``` 
/*
 * Dell WMI hotkeys
 *
 * Copyright (C) 2008 Red Hat <mjg@redhat.com>
 * Copyright (C) 2014-2015 Pali Rohár <pali.rohar@gmail.com>

```

The full source code can be found [here][1].

Additionally it is compatible with kernel versions 2.6.30–2.6.39, 3.0–3.19, 4.0–4.12, 4.13-rc+HEAD according to this [link][2].

# What are Dell-WMI hot keys?

This picture shows the Dell WMI hotkeys in the top right hand corner of the picture. Three keys immediately above the keyboard:

[![dell WMI hotkeys][3]][3]

# How to tell if the driver is loaded?

Press each of the three keys in order and type in the terminal:

``` 
dmesg | tail

```

If the keys are undefined in Linux (as on my Dell 17R 7720 SE) you'll see this:

``` 
[22029.994271] dell_wmi: Unknown key e0f0 pressed
[22032.865727] dell_wmi: Unknown key e02a pressed
[22033.153981] dell_wmi: Unknown key e02b pressed
[22035.538910] atkbd serio0: Unknown key pressed (translated set 2, code 0x60 on isa0060/serio0).
[22035.538919] atkbd serio0: Use 'setkeycodes 60 <keycode>' to make it known.
[22459.638125] dell_wmi: Unknown key e0f0 pressed
[22460.857257] dell_wmi: Unknown key e02a pressed
[22461.174731] dell_wmi: Unknown key e02b pressed
[22461.958683] atkbd serio0: Unknown key pressed (translated set 2, code 0x60 on isa0060/serio0).
[22461.958689] atkbd serio0: Use 'setkeycodes 60 <keycode>' to make it known.

```

If the keys were working a pop-up menu according to that keys function would appear on your screen. If they aren't assigned, you can assign these keys as shortcuts to your everyday work functions. Personally I use a wireless backlit keyboard (Logitech K800) so never touch the laptop's backlit keyboard and haven't looked at these keys in years.

If you require further details don't hesitate to ask via comment below.

  [1]: https://github.com/torvalds/linux/blob/master/drivers/platform/x86/dell-wmi.c
  [2]: http://cateee.net/lkddb/web-lkddb/DELL_WMI.html
  [3]: https://i.stack.imgur.com/VrZL9.jpg
