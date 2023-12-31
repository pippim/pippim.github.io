---
layout:       post
title:        >
    systemd-journald High CPU Usage causes system shutdown
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1001547
type:         Answer
tags:         systemd overheating systemd-journald
created_date: 2018-01-31 02:12:06
edit_date:    
votes:        "0 "
favorites:    
views:        "2,551 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-31-systemd-journald-High-CPU-Usage-causes-system-shutdown.md
toc:          false
navigation:   false
clipboard:    false
---

If your system is shutting down from overheating you should immediately start using Intel `Powerclamp`. It comes when installing `thermald` and installing `tlp` is also highly recommended.

The advantage of slowing down your CPU when it is about to overheat and shutdown is it gives you a chance to analyze what is happening at that time without it shutting off completely.

The other advantage of slowing down your CPU is avoiding possible damage to a chip that costs $478 (or whatever) not including labor to replace it.

You can read more about all three here: [Stop cpu from overheating][1]

The main concern I've had about constant logging in the past is when it grows > 1 GB when normally it's about < 1 MB before it's rolled over and compressed. A disk full due to looping errors is a pain.


  [1]: {% post_url /2017/2017-01-25-Stop-cpu-from-overheating %}
