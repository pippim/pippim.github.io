---
layout:       post
title:        >
    Windows move between workspaces when screen turns off
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1070319
type:         Answer
tags:         16.04 unity workspaces external-monitor thunderbolt
created_date: 2018-08-30 00:26:12
edit_date:    2024-10-10 23:25:10
votes:        "2 "
favorites:    
views:        "2,111 "
accepted:     Accepted
uploaded:     2025-02-15 10:53:31
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-30-Windows-move-between-workspaces-when-screen-turns-off.md
toc:          false
navigation:   false
clipboard:    false
---

### Update 2024-10-10

There is a new bug report after Ubuntu 16.04 LTS (with Unity and Compiz) for the Gnome Shell in 2021 through 2024:

- [Windows switch monitor after resuming from sleep ](https://bugs.launchpad.net/ubuntu/+source/mutter/+bug/1927948)

A few years ago I changed my system to **NOT** rearrange windows when a monitor is disconnected. This solved the problem for me.

### Original answer

There is a four year old bug report on this and the fix is in and it's been triaged:

[Windows change Monitor/Desktop after screen lock][1]

In the short term instead of locking the screen on inactivity (which basically shuts it off with gnome-screensaver I think) you could consider a screen saver with password that kicks in after a period of inactivity. I haven't tested this myself mind you.

  [1]: https://bugs.launchpad.net/ubuntu/+source/unity/+bug/1295267
