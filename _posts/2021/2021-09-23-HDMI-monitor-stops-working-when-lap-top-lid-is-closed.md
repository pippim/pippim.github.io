---
layout:       post
title:        >
    HDMI monitor stops working when lap top lid is closed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1365346
type:         Answer
tags:         multiple-monitors power-management hdmi
created_date: 2021-09-23 12:56:12
edit_date:    
votes:        "1 "
favorites:    
views:        "65 "
accepted:     Accepted
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-09-23-HDMI-monitor-stops-working-when-lap-top-lid-is-closed.md
toc:          false
navigation:   false
clipboard:    false
---

From: [Closing lid problem](Closing lid problem)


----------


To make Ubuntu do nothing when laptop lid is closed:
Open the `/etc/systemd/logind.conf` file in a text editor as root, for example

`sudo -H gedit /etc/systemd/logind.conf`

Add a line `HandleLidSwitch=ignore`

Restart the systemd daemon with this command:

`sudo service systemd-logind restart`

If that didn't work set the following

`IgnoreLid=true` in `/etc/UPower/UPower.conf`

