---
layout:       post
title:        >
    i have problem when i install or update Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064902
type:         Answer
tags:         system-installation upgrade updates
created_date: !!str "2018-08-13 10:01:48"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "68"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
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
