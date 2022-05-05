---
layout:       post
title:        >
    i have problem when i install or update Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064902
type:         Answer
tags:         system-installation upgrade updates
created_date: 2018-08-13 10:01:48
edit_date:    
votes:        "1 "
favorites:    
views:        "70 "
accepted:     Accepted
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-13-i-have-problem-when-i-install-or-update-Ubuntu.md
toc:          false
navigation:   false
clipboard:    false
---

Try using:

``` 
sudo apt install -f
```

Do not add `upstart` to the end.

You should not be trying to install `upstart` in the first place because `systemd` is the preferred system of booting and monitoring your system.

What you probably intend to do is:

``` 
sudo apt update
sudo apt upgrade
```

But as the error message states run `sudo apt install -f` all by itself first.
