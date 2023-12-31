---
layout:       post
title:        >
    Closing lid turns off external monitor on 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1078471
type:         Answer
tags:         multiple-monitors display power-management laptop gnome-screensaver
created_date: 2018-09-26 00:53:04
edit_date:    
votes:        "1 "
favorites:    
views:        "3,960 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-09-26-Closing-lid-turns-off-external-monitor-on-16.04.md
toc:          false
navigation:   false
clipboard:    false
---

The external monitor(s) turn off in Kernel `4.4.0-135`. However in Kernel `4.13.0-36` the external monitor(s) simply reset and set Brightness to `1.00` and Gamma to `1.0:1.0:1.0`.

Upgrading kernel would be the simplest way of solving the issue.

As the other answer mentioned simply moving the mouse will wake up the external monitors when using Kernel `4.4.0-135`.
