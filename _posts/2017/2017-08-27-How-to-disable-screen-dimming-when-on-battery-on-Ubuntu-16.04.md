---
layout:       post
title:        >
    How to disable screen dimming when on battery on Ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/950187
type:         Answer
tags:         16.04 power-management screen
created_date: 2017-08-27 01:44:48
edit_date:    
votes:        "0 "
favorites:    
views:        "833 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-27-How-to-disable-screen-dimming-when-on-battery-on-Ubuntu-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

Caveat Emptor... I'm the author of the proposed solution. When you plug in or unplug your AC adapter a one time `udev` event is triggered and then Ubuntu brigntens or dims your screen. Most posts here are complaints about the screen not dimming on battery power. Your complaint however is the opposite.

This application will automatically set your screen brightness based on internet specified sunrise and sunset: [Automatically adjust display brightness based on sunrise and sunset][1]. Additionally you define a transition period for dawn and dusk (usually about 90 minutes).

There are already some "under the hood" hooks into `systemd` to react after suspend/resume for instantaneous/transparent screen brightness reset. Another script can be provided to respond within a millisecond when AC is plugged/unplugged instead of waiting 1 to 59 seconds for your screen brightness to return to optimal setting. Testing and feedback will be required from yourself as my own display doesn't change when AC is plugged/unplugged and I can't duplicate your "complaint". As Is though the proposed solution should work to solve your problem with an average 30 second wait period for your screen brightness to return to "normal".

  [1]: {% post_url /2017/2017-03-19-Automatically-adjust-display-brightness-based-on-sunrise-and-sunset %}
