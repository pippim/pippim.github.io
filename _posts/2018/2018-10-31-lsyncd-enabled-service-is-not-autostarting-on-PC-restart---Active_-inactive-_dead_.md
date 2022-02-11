---
layout:       post
title:        >
    lsyncd enabled service is not autostarting on PC restart - Active: inactive (dead)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1088746
type:         Answer
tags:         server kubuntu kde systemd services
created_date: 2018-10-31 02:52:55
edit_date:    
votes:        "2 "
favorites:    
views:        "2,359 "
accepted:     Accepted
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-31-lsyncd-enabled-service-is-not-autostarting-on-PC-restart---Active_-inactive-_dead_.md
toc:          false
navigation:   false
clipboard:    false
---

Systemd can be confusing with before's and after's but I would change:

``` 
After=network.target remote-fs.target media-blueray-Data.mount media-blueray-WDRed.mount
```

To:

``` 
After=network.target remote-fs.target media-blueray-Data.mount media-blueray-WDRed.mount network.target multi-user.target
```

based upon this [answer][1].


  [1]: https://github.com/google/cloud-print-connector/issues/140
