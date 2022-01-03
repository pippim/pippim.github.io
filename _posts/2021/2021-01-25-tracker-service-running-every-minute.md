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
views:        "3,360 "
accepted:     
uploaded:     2022-01-03 08:14:44
toc:          false
navigation:   false
clipboard:    false
---

The modern way to disable Tracker is found here:

- [https://askubuntu.com/questions/1187191/tracker-process-taking-lot-of-cpu](https://askubuntu.com/questions/1187191/tracker-process-taking-lot-of-cpu)

Run the following command to disable tracker for the current user:

``` 
systemctl --user mask tracker-store.service tracker-miner-fs.service tracker-miner-rss.service tracker-extract.service tracker-miner-apps.service tracker-writeback.service
tracker reset --hard
sudo reboot
```


----------


Interestingly the question was quite popular in 2013:

- [https://askubuntu.com/questions/346211/tracker-store-and-tracker-miner-fs-eating-up-my-cpu-on-every-startup](https://askubuntu.com/questions/346211/tracker-store-and-tracker-miner-fs-eating-up-my-cpu-on-every-startup)

The solution to disable it here is now outdated. Just pointing out the more things change the more they stay the same...

