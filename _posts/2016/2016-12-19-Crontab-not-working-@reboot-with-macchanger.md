---
layout:       post
title:        >
    Crontab not working @reboot with macchanger
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/862173
type:         Answer
tags:         networking cron
created_date: !!str "2016-12-19 05:20:10"
edit_date:    !!str "2016-12-22 22:23:27"
votes:        !!str "1"
favorites:    
views:        !!str "2,107"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

Commands have to be prefixed with the directory name and parameters have to be enclosed in double quotes. Assuming your `macchanger` resides in the regular path, create a file (with any name) in the `/etc/cron.d` directory containing:

``` 
SHELL=/bin/sh
	PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
```

``` 
@reboot root sleep 15
@reboot root macchanger "-r eth0"

```

