---
layout:       post
title:        >
    Battery icon not showing in Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038523
type:         Answer
tags:         icons power-management battery gnome-power-manager
created_date: 2018-05-20 23:54:52
edit_date:    
votes:        "4 "
favorites:    
views:        "3,814 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-20-Battery-icon-not-showing-in-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    true
---

Make sure you are running the correct parameter. For example using your parameters on my system:

``` 
$ upower -i /org/freedesktop/uPower/devices/battery/BAT0
  native-path:          (null)
  power supply:         no
  updated:              Wed 31 Dec 1969 05:00:00 PM MST (1526860188 seconds ago)
  has history:          no
  has statistics:       no
  unknown
    warning-level:       unknown
    icon-name:          '(null)'
```

Using the correct parameter however:

{% include copyHeader.html %}
``` 
$ upower -i /org/freedesktop/UPower/devices/battery_BAT1
  native-path:          BAT1
  vendor:               COMPAL
  model:                PABAS0241231
  serial:               41167
  power supply:         yes
  updated:              Sun 20 May 2018 05:51:55 PM MDT (97 seconds ago)
  has history:          yes
  has statistics:       yes
  battery
    present:             yes
    rechargeable:        yes
    state:               charging
    warning-level:       none
    energy:              64.3968 Wh
    energy-empty:        0 Wh
    energy-full:         92.4192 Wh
    energy-full-design:  96.48 Wh
    energy-rate:         0 W
    voltage:             15.413 V
    percentage:          69%
    capacity:            95.791%
    technology:          lithium-ion
    icon-name:          'battery-full-charging-symbolic'
```

To see everything (including what the correct parameter would be) use:

{% include copyHeader.html %}
``` 
$ upower -d
Device: /org/freedesktop/UPower/devices/line_power_ACAD
  native-path:          ACAD
  power supply:         yes
  updated:              Sun 20 May 2018 03:56:16 PM MDT (6911 seconds ago)
  has history:          no
  has statistics:       no
  line-power
    warning-level:       none
    online:              yes
    icon-name:          'ac-adapter-symbolic'

Device: /org/freedesktop/UPower/devices/battery_BAT1
  native-path:          BAT1
  vendor:               COMPAL
  model:                PABAS0241231
  serial:               41167
  power supply:         yes
  updated:              Sun 20 May 2018 05:49:55 PM MDT (92 seconds ago)
  has history:          yes
  has statistics:       yes
  battery
    present:             yes
    rechargeable:        yes
    state:               charging
    warning-level:       none
    energy:              64.3968 Wh
    energy-empty:        0 Wh
    energy-full:         92.4192 Wh
    energy-full-design:  96.48 Wh
    energy-rate:         0 W
    voltage:             15.413 V
    percentage:          69%
    capacity:            95.791%
    technology:          lithium-ion
    icon-name:          'battery-full-charging-symbolic'

Device: /org/freedesktop/UPower/devices/ups_hiddev2
  native-path:          /sys/devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.2/1-1.2:1.0/usbmisc/hiddev2
  vendor:               CPS
  model:                CP550HGa
  serial:               BFBB104#BI1.g
  power supply:         yes
  updated:              Sun 20 May 2018 05:50:58 PM MDT (29 seconds ago)
  has history:          yes
  has statistics:       yes
  ups
    present:             yes
    state:               fully-charged
    warning-level:       none
    time to empty:       37.5 minutes
    percentage:          100%
    icon-name:          'battery-full-charged-symbolic'

Device: /org/freedesktop/UPower/devices/mouse_0003o046Do101Ax000D
  native-path:          /sys/devices/pci0000:00/0000:00:14.0/usb1/1-2/1-2:1.2/0003:046D:C52B.000C/0003:046D:101A.000D
  vendor:               Logitech, Inc.
  model:                Performance MX
  serial:               E6CE4571
  power supply:         no
  updated:              Sun 20 May 2018 05:50:18 PM MDT (69 seconds ago)
  has history:          yes
  has statistics:       no
  mouse
    present:             yes
    rechargeable:        yes
    state:               discharging
    warning-level:       none
    percentage:          55%
    icon-name:          'battery-good-symbolic'

Device: /org/freedesktop/UPower/devices/keyboard_0003o046Do2010x000E
  native-path:          /sys/devices/pci0000:00/0000:00:14.0/usb1/1-2/1-2:1.2/0003:046D:C52B.000C/0003:046D:2010.000E
  vendor:               Logitech, Inc.
  model:                K800
  serial:               6DB54BFE
  power supply:         no
  updated:              Sun 20 May 2018 05:50:18 PM MDT (69 seconds ago)
  has history:          yes
  has statistics:       no
  keyboard
    present:             yes
    rechargeable:        yes
    state:               discharging
    warning-level:       none
    percentage:          55%
    icon-name:          'battery-good-symbolic'

Device: /org/freedesktop/UPower/devices/DisplayDevice
  power supply:         yes
  updated:              Sun 20 May 2018 03:56:16 PM MDT (6911 seconds ago)
  has history:          no
  has statistics:       no
  ups
    present:             yes
    state:               fully-charged
    warning-level:       none
    time to empty:       37.5 minutes
    percentage:          100%
    icon-name:          'battery-full-charged-symbolic'

Daemon:
  daemon-version:  0.99.4
  on-battery:      no
  lid-is-closed:   no
  lid-is-present:  yes
  critical-action: HybridSleep
```

