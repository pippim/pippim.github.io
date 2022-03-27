---
layout:       post
title:        >
    Power Management only has the option of "Do Nothing" for critically low battery in 17.10
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1017269
type:         Answer
tags:         17.10 power-management
created_date: 2018-03-19 11:08:53
edit_date:    2018-03-22 00:03:58
votes:        "8 "
favorites:    
views:        "2,848 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-19-Power-Management-only-has-the-option-of-_Do-Nothing_-for-critically-low-battery-in-17.10.md
toc:          false
navigation:   true
clipboard:    true
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# Step 1: Check `gsettings`

There are two options you can check in the terminal:

``` 
$ gsettings get org.gnome.settings-daemon.plugins.power critical-battery-action
'suspend'
$ gsettings get org.gnome.settings-daemon.plugins.power percentage-low
'10'
```

Then to change them use:

``` 
$ gsettings set org.gnome.settings-daemon.plugins.power critical-battery-action suspend
$ gsettings set org.gnome.settings-daemon.plugins.power percentage-low 10
```

Note on my system they are just fine, so I changed them back to what they were in the first place for sake of example.


----------


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# Step 2: Check `upower`

Gnome power management utilizes `upower` to do the heavy lifting. To ensure it is running and collecting battery statistics as it should, use:

{% include copyHeader.html %}
``` 
$ upower -d 
Device: /org/freedesktop/UPower/devices/line_power_ACAD
  native-path:          ACAD
  power supply:         yes
  updated:              Sun 18 Mar 2018 02:28:25 PM MDT (135878 seconds ago)
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
  updated:              Tue 20 Mar 2018 04:12:10 AM MDT (53 seconds ago)
  has history:          yes
  has statistics:       yes
  battery
    present:             yes
    rechargeable:        yes
    state:               charging
    warning-level:       none
    energy:              48.2544 Wh
    energy-empty:        0 Wh
    energy-full:         93.3552 Wh
    energy-full-design:  96.48 Wh
    energy-rate:         0.0044914 W
    voltage:             14.76 V
    percentage:          51%
    capacity:            96.7612%
    technology:          lithium-ion
    icon-name:          'battery-good-charging-symbolic'

Device: /org/freedesktop/UPower/devices/mouse_0003o046Do101Ax0008
  native-path:          /sys/devices/pci0000:00/0000:00:14.0/usb1/1-2/1-2:1.2/0003:046D:C52B.0003/0003:046D:101A.0008
  vendor:               Logitech, Inc.
  model:                Performance MX
  serial:               E6CE4571
  power supply:         no
  updated:              Tue 20 Mar 2018 04:12:09 AM MDT (54 seconds ago)
  has history:          yes
  has statistics:       no
  mouse
    present:             yes
    rechargeable:        yes
    state:               discharging
    warning-level:       none
    percentage:          55%
    icon-name:          'battery-good-symbolic'

Device: /org/freedesktop/UPower/devices/keyboard_0003o046Do2010x0009
  native-path:          /sys/devices/pci0000:00/0000:00:14.0/usb1/1-2/1-2:1.2/0003:046D:C52B.0003/0003:046D:2010.0009
  vendor:               Logitech, Inc.
  model:                K800
  serial:               6DB54BFE
  power supply:         no
  updated:              Tue 20 Mar 2018 04:12:09 AM MDT (54 seconds ago)
  has history:          yes
  has statistics:       no
  keyboard
    present:             yes
    rechargeable:        yes
    state:               discharging
    warning-level:       none
    percentage:          90%
    icon-name:          'battery-full-symbolic'

Device: /org/freedesktop/UPower/devices/ups_hiddev3
  native-path:          /sys/devices/pci0000:00/0000:00:14.0/usb1/1-1/1-1.4/1-1.4.4/1-1.4.4:1.0/usbmisc/hiddev3
  vendor:               CPS
  model:                CP550HGa
  serial:               BFBB104#BI1.g
  power supply:         yes
  updated:              Tue 20 Mar 2018 04:12:51 AM MDT (12 seconds ago)
  has history:          yes
  has statistics:       yes
  ups
    present:             yes
    state:               fully-charged
    warning-level:       none
    time to empty:       37.5 minutes
    percentage:          100%
    icon-name:          'battery-full-charged-symbolic'

Device: /org/freedesktop/UPower/devices/DisplayDevice
  power supply:         yes
  updated:              Tue 20 Mar 2018 04:10:14 AM MDT (169 seconds ago)
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

First run this command when the laptop is plugged in. Then unplug the laptop and run the command after some time and ensure battery remaining time has reduced appropriately.


----------


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

# Last Step - Low level hibernation

This is the last step which would be taken after exhausting all other steps. This step doesn't require Ubuntu or Unity or Gnome or `gsettings` or `upower`. It only requires `systemd`, `udev` and `cron` which are built into almost all Linux Distros with or without GUI (Desktop).

From [ArchLinux][1]:

## Hibernate on low battery level

If your battery sends events to `udev` whenever it (dis)charges by 1%, you can use this `udev` rule to automatically hibernate the system when battery level is critical, and thus prevent all unsaved work from being lost.
**Note:** Not all batteries report discharge events. Test by running `udevadm monitor --property` while on battery and see if any events are reported. You should wait at least 1% drop. If no events are reported and `/sys/class/power_supply/BAT0/alarm` is non-zero then the battery will likely trigger an event when `BAT0/energy_now` drops below the alarm value, and the `udev` rule will work as long as the percentage math works out. Some laptops have an option for this disabled in BIOS by default.

``` 
$ cat /etc/udev/rules.d/99-lowbat.rules

# Suspend the system when battery level drops to 5% or lower
SUBSYSTEM=="power_supply", ATTR{status}=="Discharging", ATTR{capacity}=="[0-5]", RUN+="/usr/bin/systemctl hibernate"
```

This rule will be repeated whenever the condition is set. As such, when resuming from hibernate when the battery is critical, the computer will hibernate directly. Some laptops do not boot beyond a certain battery level, so the rule could be adjusted accordingly.

Batteries can jump to a lower value instead of discharging continuously, therefore a `udev` string matching pattern for all capacities `0` through `5` is used.

Other rules can be added to perform different actions depending on power supply status and/or capacity.

If your system has no or missing ACPI events, use `cron` with the following script:

``` sh
#!/bin/sh
acpi -b | awk -F'[,:%]' '{print $2, $3}' | {
	read -r status capacity

	if [ "$status" = Discharging -a "$capacity" -lt 5 ]; then
		logger "Critical battery threshold"
		systemctl hibernate
	fi
}
```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

## Testing events

One way to test `udev` rules is to have them create a file when they are run. For example:

``` 
$ cat /etc/udev/rules.d/98-discharging.rules

SUBSYSTEM=="power_supply", ATTR{status}=="Discharging", RUN+="/usr/bin/touch /home/example/discharging"
```

This creates a file at `/home/example/discharging` when the laptop charger is unplugged. You can test whether the rule worked by unplugging your laptop and looking for this file. For more advanced `udev` rule testing, see [Udev#Testing rules before loading][2]. 

# Summary

There are more steps to post between Step #2 and "Last Step" but these will be posted as OP reveals more details after testing. In the mean time the "Last Step" should reduce more half-way answers like simply reporting percentage remaining.

  [1]: https://wiki.archlinux.org/index.php/laptop#hibernate_on_low_battery_level
  [2]: https://wiki.archlinux.org/index.php/Udev#Testing_rules_before_loading


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a></div>

