---
layout:       post
title:        >
    Laptop not shutting down on low power
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1150124
type:         Answer
tags:         laptop battery
created_date: 2019-06-10 22:45:51
edit_date:    2019-06-10 22:56:03
votes:        "3 "
favorites:    
views:        "647 "
accepted:     Accepted
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-10-Laptop-not-shutting-down-on-low-power.md
toc:          false
navigation:   false
clipboard:    true
---

Unless something has changed recently you should have this file: `/etc/UPower/UPower.conf` containing:


{% include copyHeader.html %}
``` 
# Only the system vendor should modify this file, ordinary users
# should not have to change anything.

[UPower]

# Enable the Watts Up Pro device.
#
# The Watts Up Pro contains a generic FTDI USB device without a specific
# vendor and product ID. When we probe for WUP devices, we can cause
# the user to get a perplexing "Device or resource busy" error when
# attempting to use their non-WUP device.
#
# The generic FTDI device is known to also be used on:
#
# - Sparkfun FT232 breakout board
# - Parallax Propeller
#
# default=false
EnableWattsUpPro=false

# Don't poll the kernel for battery level changes.
#
# Some hardware will send us battery level changes through
# events, rather than us having to poll for it. This option
# allows disabling polling for hardware that sends out events.
#
# default=false
NoPollBatteries=false

# Do we ignore the lid state
#
# Some laptops are broken. The lid state is either inverted, or stuck
# on or off. We can't do much to fix these problems, but this is a way
# for users to make the laptop panel vanish, a state that might be used
# by a couple of user-space daemons. On Linux systems, see also
# logind.conf(5).
#
# default=false
IgnoreLid=false

# Policy for warnings and action based on battery levels
#
# Whether battery percentage based policy should be used. The default
# is to use the time left, change to true to use the percentage, which
# should work around broken firmwares. It is also more reliable than
# the time left (frantically saving all your files is going to use more
# battery than letting it rest for example).
# default=true
UsePercentageForPolicy=true

# When UsePercentageForPolicy is true, the levels at which UPower will
# consider the battery low, critical, or take action for the critical
# battery level.
#
# This will also be used for batteries which don't have time information
# such as that of peripherals.
#
# If any value is invalid, or not in descending order, the defaults
# will be used.
#
# Defaults:
# PercentageLow=10
# PercentageCritical=3
# PercentageAction=2
PercentageLow=10
PercentageCritical=3
PercentageAction=2

# When UsePercentageForPolicy is false, the time remaining at which UPower
# will consider the battery low, critical, or take action for the critical
# battery level.
#
# If any value is invalid, or not in descending order, the defaults
# will be used.
#
# Defaults:
# TimeLow=1200
# TimeCritical=300
# TimeAction=120
TimeLow=1200
TimeCritical=300
TimeAction=120

# The action to take when "TimeAction" or "PercentageAction" above has been
# reached for the batteries (UPS or laptop batteries) supplying the computer
#
# Possible values are:
# PowerOff
# Hibernate
# HybridSleep
#
# If HybridSleep isn't available, Hibernate will be used
# If Hibernate isn't available, PowerOff will be used
CriticalPowerAction=HybridSleep
```

When percentage is true (default), the lines:

``` 
PercentageLow=10
PercentageCritical=3
PercentageAction=2
```

Means at 10% remaining you are told battery is running low. At 3% remaining a critical warning is issued saying battery is about to die. At 2% remaining your machine shuts down.

When percentage is false, the lines:

``` 
TimeLow=1200
TimeCritical=300
TimeAction=120
```

Means at 1200 seconds (20 minutes) remaining you are told battery is running low. At 300 seconds (5 minutes) remaining a critical warning is issued saying battery is about to die. At 120 seconds (2 minutes) remaining your machine shuts down.

The configuration file settings should be duplicated in `gsettings` which you can confirm with:

``` 
$ gsettings list-recursively | grep plugins.power | grep time
org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0
org.gnome.settings-daemon.plugins.power sleep-inactive-battery-timeout 0
org.gnome.settings-daemon.plugins.power time-low 1200
org.gnome.settings-daemon.plugins.power time-action 120
org.gnome.settings-daemon.plugins.power time-critical 300
org.gnome.settings-daemon.plugins.power use-time-for-policy true
```

and with:

``` 
$ gsettings list-recursively | grep plugins.power | grep percentage
org.gnome.settings-daemon.plugins.power percentage-low 10
org.gnome.settings-daemon.plugins.power percentage-critical 3
org.gnome.settings-daemon.plugins.power percentage-action 2
```

