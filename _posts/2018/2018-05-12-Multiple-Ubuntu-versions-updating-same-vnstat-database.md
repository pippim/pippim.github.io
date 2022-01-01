---
layout:       post
title:        >
    Multiple Ubuntu versions updating same vnstat database
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035141
type:         Question
tags:         16.04 dual-boot 18.04 vnstat conky
created_date: !!str "2018-05-12 01:44:55"
edit_date:    !!str "2018-05-21 23:10:36"
votes:        !!str "1"
favorites:    
views:        !!str "416"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

I've been testing Ubuntu 16.04 to 18.04 upgrade. I upgraded last week and I rebooted 18.04 tonight. Notice how `conky` shows gaps for `vnstat`:

[![vnstat 18.04 reboot.gif][1]][1]

- "Yesterday" is blank but there should be 8.76 GB.
- "Week" shows 7 GB but should be 32.33 GB + 2.52 GB for 18.04 boot tonight.
- "Month" shows 45.63 GB but it really is about 70 GB

The reason is 16.04 and 18.04 have separate databases that aren't synced when I clone 16.04 to test partition and upgrade to 18.04: https://askubuntu.com/questions/1028604/bash-script-to-clone-ubuntu-to-new-partition-for-testing-18-04-lts-upgrade/1028605#1028605

How can I have Ubuntu 16.04 on one partition and Ubuntu 18.04 on another partition both updating the same `vnstat` database? I would like to store the database on a third partition (`ntfs` File System) already setup for sharing Windows Subsystem for Linux (WSL) data and Ubuntu data.

Bonus: assuming I can collect Daily RX/TX/Total stats in Windows, how can I populate them into the `vnstat` database?


----------


**EDIT 1:** Using accepted answer 16.04 and 18.04 are both updating `vnstat` 16.04 version data files in ntfs formatted partition `/mnt/e/var/lib/vnstat/`. I had to roll-back Ubuntu 18.04 `vnstat` version 1.18 and pin it to the Ubuntu 16.04 version 1.13 aka 1.14-1.

The next step will be to get Windows 10 **WSL** to "see" the data and display it somehow. After that get **WSL** to run `vnstatd` daemon on boot and collect/update network bandwidth statistics.

  [1]: https://i.stack.imgur.com/jqqwa.gif
