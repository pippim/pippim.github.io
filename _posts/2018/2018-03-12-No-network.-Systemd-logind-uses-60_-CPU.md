---
layout:       post
title:        >
    No network. Systemd-logind uses 60% CPU
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1014340
type:         Answer
tags:         network-manager systemd
created_date: 2018-03-12 22:47:34
edit_date:    
votes:        "0 "
favorites:    
views:        "331 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-12-No-network.-Systemd-logind-uses-60_-CPU.md
toc:          false
navigation:   false
clipboard:    false
---

Luckily <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> still gives you a console login.

With no network manager your `systemd` could be wasting time waiting for it to come up. After logging into the console use this command:

``` 
sudo systemctl disable NetworkManager-wait-online.service
```

Then reboot.

If you find out later you need the service at boot time use:

``` 
sudo systemctl enable NetworkManager-wait-online.service
```

