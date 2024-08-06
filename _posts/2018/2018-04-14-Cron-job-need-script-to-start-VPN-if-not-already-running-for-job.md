---
layout:       post
title:        >
    Cron job - need script to start VPN if not already running for job
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1025048
type:         Answer
tags:         network-manager vpn cron nmcli openconnect
created_date: 2018-04-14 19:07:26
edit_date:    
votes:        "2 "
favorites:    
views:        "0 "
accepted:     Accepted
uploaded:     2024-08-06 17:23:58
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-14-Cron-job-need-script-to-start-VPN-if-not-already-running-for-job.md
toc:          false
navigation:   false
clipboard:    false
---

From Gnome's [nmcli][1] website:

``` 
$ nmcli con show --active
NAME                UUID                                  TYPE             DEVICE  
TELUS1213-5G        a857583c-3f2a-4399-9fc6-3df74b0509f0  802-11-wireless  wlp60s0 
Wired connection 1  f1d049d0-ad20-3201-ac70-5cb8cc06a6e5  802-3-ethernet   enp59s0 
```

To test if a specific connection is active use:

``` 
nmcli con show --active <connection_name>
```

  [1]: https://developer.gnome.org/NetworkManager/stable/nmcli.html
