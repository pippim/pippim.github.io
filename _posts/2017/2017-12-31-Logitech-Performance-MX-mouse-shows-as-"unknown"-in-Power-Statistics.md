---
layout:       post
title:        >
    Logitech Performance MX mouse shows as "unknown" in Power Statistics
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/991155
type:         Answer
tags:         16.04 mouse indicator battery logitech-unifying
created_date: 2017-12-31 22:02:55
edit_date:    2020-06-13 17:35:13
votes:        "2 "
favorites:    
views:        "2,425 "
accepted:     Accepted
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-12-31-Logitech-Performance-MX-mouse-shows-as-"unknown"-in-Power-Statistics.md
toc:          false
navigation:   false
clipboard:    true
---

# Permanent Fix

I'm placing the permanent fix discovered a week later at the top of this answer because that is what people are likely most interested in.

Digging through old bug reports I found this related problem: [Logitech M515 does not work after upgrade to 12.04][1]. Using solutions here I edited `/etc/rc.local` and inserted the following lines:

``` 
# Jan 05 2018 - Reload Logitech Unifying Receiver to get Mouse in Power Stats
modprobe -r hid_logitech_dj
modprobe    hid_logitech_dj

```

Then I rebooted **twice**. On the first reboot the external display didn't appear and the login prompt was delayed. On the second reboot everything was normal and the Power Statistics appeared as they should:

[![Power stats normal][2]][2]

# Temporary work-around

I found this [bug report][3] which suggests unplugging and replugging the Unifying Receiver. Sure enough it worked:

[![Logitech Mouse Work-around][4]][4]

This bug report suggests running kernel >= 4.12 and `upower` >= 0.99.5. Although the current `upower` version is `0.99.7` it is unstable and the current version in Ubuntu is `0.99.4` released February 2016. It's not feasible to get a version >= `0.99.5`

## Login screen battery status

At the boot-up login screen the system tray displays the battery icon. Clicking on it reveals only the UPS and Laptop battery statistics.

## udev rules not running during boot only on replugging

This [bug report][5] details how `udev` rules aren't running on boot but only when replugging cables. This "sounds" similar to the unifying receiver here. The bug report does provide clues on additional information to look for. ie `udev` (or something else) has enumerated devices in the system paths:

{% include copyHeader.html %}
``` 
$ udevadm info /sys/class/power_supply/hidpp_battery_0
P: /devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.0005/0003:046D:2010.0007/power_supply/hidpp_battery_0
E: DEVPATH=/devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.0005/0003:046D:2010.0007/power_supply/hidpp_battery_0
E: POWER_SUPPLY_CAPACITY_LEVEL=High
E: POWER_SUPPLY_MANUFACTURER=Logitech
E: POWER_SUPPLY_MODEL_NAME=K800
E: POWER_SUPPLY_NAME=hidpp_battery_0
E: POWER_SUPPLY_ONLINE=1
E: POWER_SUPPLY_SCOPE=Device
E: POWER_SUPPLY_SERIAL_NUMBER=2010-6d-b5-4b-fe
E: POWER_SUPPLY_STATUS=Discharging
E: SUBSYSTEM=power_supply

$ udevadm info /sys/class/power_supply/hidpp_battery_1
P: /devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.0005/0003:046D:101A.0006/power_supply/hidpp_battery_1
E: DEVPATH=/devices/pci0000:00/0000:00:14.0/usb1/1-9/1-9:1.2/0003:046D:C52B.0005/0003:046D:101A.0006/power_supply/hidpp_battery_1
E: POWER_SUPPLY_CAPACITY_LEVEL=Normal
E: POWER_SUPPLY_MANUFACTURER=Logitech
E: POWER_SUPPLY_MODEL_NAME=Performance MX
E: POWER_SUPPLY_NAME=hidpp_battery_1
E: POWER_SUPPLY_ONLINE=1
E: POWER_SUPPLY_SCOPE=Device
E: POWER_SUPPLY_SERIAL_NUMBER=101a-e6-ce-45-71
E: POWER_SUPPLY_STATUS=Discharging
E: SUBSYSTEM=power_supply

```

**IMPORTANT NOTE:** Even though `/sys/class/power...` contains information on Keyboard and Mouse batteries the Power Statistics display currently shows NOTHING, not even the keyboard anymore. After writing this paragraph I replugged the unifying receiver and the battery levels were displayed.


----------

# June 13, 2020 update

Today neither keyboard nor mouse appear in Power Statistics. Also:

- `hidpp_battery_0` has changed to `hidpp_battery_1`
- `hidpp_battery_1` has changed to `hidpp_battery_4`

Googling for new information on the Power Statistics problem I discovered someone made a scrolling video of this **Ask Ubuntu** Q&A without credits or source:

- [Ubuntu: Logitech Performance MX mouse shows as "unknown" in Power Statistics](https://www.youtube.com/watch?v=LbbbvFvfSu8)

It wasn't helpful watching a video slowing scrolling through what I already posted...

I did find this new link suggesting kernel > 4.7 and upower >= 0.99.5 fixes the problem:

- [Logitech MX Master (Unifying adapter) no power info](https://gitlab.freedesktop.org/upower/upower/-/issues/39)

  [1]: https://askubuntu.com/questions/128345/logitech-m515-does-not-work-after-upgrade-to-12-04
  [2]: https://i.stack.imgur.com/PhoBU.png
  [3]: https://bugs.freedesktop.org/show_bug.cgi?id=95260
  [4]: https://i.stack.imgur.com/vjDuL.png
  [5]: https://bbs.archlinux.org/viewtopic.php?id=154889
