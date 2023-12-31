---
layout:       post
title:        >
    Unable to lock the administration directory (/var/lib/dpkg/) is another process using it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1163196
type:         Answer
tags:         apt package-management dpkg
created_date: 2019-08-03 17:05:22
edit_date:    
votes:        "1 "
favorites:    
views:        "3,619,515 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-03-Unable-to-lock-the-administration-directory-__var_lib_dpkg__-is-another-process-using-it_.md
toc:          false
navigation:   false
clipboard:    false
---

Like most everyone else I waited for the lock to be removed. After 30 minutes I gave up and hard booted to a different distribution. From there I used the internet for some research which landed me here.

It turns out `unattended-upgrades.service` is running. I found that be rebooting into the broken system and running:

``` 
sudo systemctl disable apt-daily.service
sudo systemctl disable unattended-upgrades.service
sudo systemctl disable apt-daily-upgrade.service
sudo systemctl disable apt-daily-upgrade.timer
sudo systemctl disable apt-daily.timer
sudo shutdown -r # Note it will take a couple minutes to reboot
```

allowed me to get the broken system working again for:

``` 
sudo apt update
sudo apt upgrade
sudo apt install -f
```

However it didn't fix the kept-back packages and impossible situation reported by `apt` in the first place. It would appear this was causing `apt` to lock up at boot in the first place.


