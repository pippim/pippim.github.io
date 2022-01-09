---
layout:       post
title:        >
    Install DPKG package without updating and upgrating the whole system
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1168622
type:         Answer
tags:         apt package-management upgrade updates
created_date: 2019-08-26 12:30:29
edit_date:    
votes:        "2 "
favorites:    
views:        "226 "
accepted:     Accepted
uploaded:     2022-01-09 16:04:07
toc:          false
navigation:   false
clipboard:    false
---

I often avoid `sudo apt upgrade` for many weeks when my system is running well. If there is a particular need for example security or new app features I will run it. First I check **Ask Ubuntu** to ensure there are no new bugs reported with `upgrade`.

What I do when I want a new package is:

``` 
sudo apt update
sudo apt install paxkage-name

```

The `update` doesn't remove software as happened with your Firefox.

The `update` will tell me X packages are upgradable but I simply ignore the message until I have time to study what will get  upgraded.
