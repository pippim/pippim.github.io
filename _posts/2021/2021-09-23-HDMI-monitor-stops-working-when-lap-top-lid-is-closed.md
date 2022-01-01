---
layout:       post
title:        >
    HDMI monitor stops working when lap top lid is closed
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1365346
type:         Answer
tags:         multiple-monitors power-management hdmi
created_date: !!str "2021-09-23 12:56:12"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "60"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

From: https://askubuntu.com/questions/898517/closing-lid-problemFrom:


----------


To make Ubuntu do nothing when laptop lid is closed:
Open the `/etc/systemd/logind.conf` file in a text editor as root, for example

`sudo -H gedit /etc/systemd/logind.conf`

Add a line `HandleLidSwitch=ignore`

Restart the systemd daemon with this command:

`sudo service systemd-logind restart`

If that didn't work set the following

`IgnoreLid=true` in `/etc/UPower/UPower.conf`

