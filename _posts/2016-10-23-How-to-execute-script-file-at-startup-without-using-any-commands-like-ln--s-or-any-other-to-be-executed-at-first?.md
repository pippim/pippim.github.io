---
layout:       post
title:        How to execute script file at startup without using any commands like ln -s or any other to be executed at first?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/840847
type:         Answer
tags:         init.d init
created_date: 2016-10-23 15:03:43
edit_date:    
votes:        4
favorites:    
views:        1,343
accepted:     
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    false
---

Interesting question. Thanks for pointing out files in `/etc/rc0.d` you learn something new every day!

# Create directory to drop your scripts into

First you need to create a directory of scripts you want automatically run at startup. I would suggest creating it within `/usr/local/bin` but it can be anywhere:

``` 
sudo mkdir /usr/local/bin/startup-scripts

```

# Modify rc.local to run all your scripts

Then type `gksu gedit /etc/rc.local` to edit the startup script that has `sudo` powers.

Before the last line that says `exit 0` copy and paste these lines:

	for SCRIPT in /usr/local/bin/startup-scripts/*
	do
		sudo chmod +x $SCRIPT
``` 
    $SCRIPT
	done
```



----------


Optionally, for every script in the `startup-scripts` directory, I would put in something like:

``` 
echo "running script xyz within /usr/local/bin/startup-scripts"

```

as this message will appear in `/var/log/syslog` file and document your system setup.
