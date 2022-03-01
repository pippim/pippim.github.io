---
layout:       post
title:        >
    How to shutdown automatically when AC power is not available
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/854756
type:         Answer
tags:         power-management shutdown battery automation
created_date: 2016-11-29 01:00:23
edit_date:    2019-04-09 10:43:58
votes:        "5 "
favorites:    
views:        "1,697 "
accepted:     Accepted
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-29-How-to-shutdown-automatically-when-AC-power-is-not-available.md
toc:          false
navigation:   false
clipboard:    false
---

Create a new rule in udev by opening the terminal and using:

``` 
gksu gedit /etc/udev/rules.d/50-ac-unplugged.rules
```

(If you are using Ubuntu 18.04 or a newer version `gksu` will not be available by default. In that situation please refer [this question][1]  or use the above command as  `sudo -H gedit /etc/udev/rules.d/50-ac-unplugged.rules`)

Put in the following line:

``` 
SUBSYSTEM=="power_supply", ENV{POWER_SUPPLY_ONLINE}=="0", RUN+="/sbin/shutdown now"
```

Save the file and then restart udev services with:

``` 
sudo udevadm control --reload-rules
```

Save all your work and unplug your power supply.


  [1]: https://askubuntu.com/questions/1030054/how-to-install-an-application-that-requires-gksu-package-on-ubuntu-18-04/1030066
