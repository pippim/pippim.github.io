---
layout:       post
title:        >
    Windows move between workspaces when screen turns off
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1070319
type:         Answer
tags:         16.04 unity workspaces external-monitor thunderbolt
created_date: !!str "2018-08-30 00:26:12"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "1,483"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

There is a four year old bug report on this and the fix is in and it's been triaged:

[Windows change Monitor/Desktop after screen lock][1]

In the short term instead of locking the screen on inactivity (which basically shuts it off with gnome-screensaver I think) you could consider a screen saver with password that kicks in after a period of inactivity. I haven't tested this myself mind you.

  [1]: https://bugs.launchpad.net/ubuntu/+source/unity/+bug/1295267
