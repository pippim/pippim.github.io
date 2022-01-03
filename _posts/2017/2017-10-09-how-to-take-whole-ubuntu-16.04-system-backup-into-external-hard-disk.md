---
layout:       post
title:        >
    how to take whole ubuntu 16.04 system backup into external hard disk
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/963223
type:         Answer
tags:         backup
created_date: 2017-10-09 04:53:28
edit_date:    2017-11-14 15:59:16
votes:        "3 "
favorites:    
views:        "7,872 "
accepted:     
uploaded:     2022-01-03 08:14:44
toc:          false
navigation:   false
clipboard:    true
---

This is what I use for a full backup:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: full-backup
# PATH: $HOME/bin
# DESC: Full system backup - must call with SUDO

# DATE: July 16, 2017. Modified July 26, 2017.

apt autoclean 	# reduces size of /var/cache/apt/archives

cd /tmp		# tar must be created in directory not backed up.

time tar -cvpzf backup.tar.gz \
--exclude=/backup.tar.gz \
--exclude=/proc \
--exclude=/tmp \
--exclude=/mnt \
--exclude=/dev \
--exclude=/sys \
--exclude=/media \
--exclude=/usr/src/linux-headers* \
--exclude=/home/rick/.cache \
--exclude=/var/log \
--exclude=/var/run/ \
--exclude=/run \
--exclude=/var/cache/apt/archives /

```

I've never used the backup to restore files and hope I will never have to.

Put the script into `/usr/local/bin/full-backup` and mark it executable using `chmod a+x /usr/local/bin/full-backup`. The backup will be a compressed file but still requires about 6 GB on my system

When you call `full-backup` script the backup archive will be created in the `/tmp` directory. Then you will need to copy it to a USB flash drive.
