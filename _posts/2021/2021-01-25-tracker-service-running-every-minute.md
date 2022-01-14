---
layout:       post
title:        >
    tracker service running every minute
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1310756
type:         Answer
tags:         systemd tracker
created_date: 2021-01-25 05:00:32
edit_date:    
votes:        "2 "
favorites:    
views:        "3,457 "
accepted:     
uploaded:     2022-01-14 05:00:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-25-tracker-service-running-every-minute.md
toc:          false
navigation:   false
clipboard:    false
---

The modern way to disable Tracker is found here:

- [Tracker process taking lot of CPU](Tracker process taking lot of CPU)

Run the following command to disable tracker for the current user:

``` 
systemctl --user mask tracker-store.service tracker-miner-fs.service tracker-miner-rss.service tracker-extract.service tracker-miner-apps.service tracker-writeback.service
tracker reset --hard
sudo reboot
```


----------


Interestingly the question was quite popular in 2013:

- [tracker-store and tracker-miner-fs eating up my CPU on every startup](tracker-store and tracker-miner-fs eating up my CPU on every startup)

The solution to disable it here is now outdated. Just pointing out the more things change the more they stay the same...

