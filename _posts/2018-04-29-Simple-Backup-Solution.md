---
layout:       post
title:        Simple Backup Solution
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029900
type:         Answer
tags:         backup cron
created_date: 2018-04-29 23:22:32
edit_date:    
votes:        3
favorites:    
views:        3,596
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    true
---

Here is part of a solution from my daily backup script which is called by cron: [Backup Linux configuration, scripts and documents to Gmail][1]. The full script is in appropriate because:

- it includes targeted `/home/me/*` files but skips 1 GB of `/home/` files important to you used by FireFox, Chrome and other apps which I have no interest in backing up.
- it includes important files to me but unimportant to you in `/etc/cron*`, `/etc/system*`, `/lib/systemd/system-sleep`, `/etc/rc.local`, `/boot/grub`, `/usr/share/plymouth`, `/etc/apt/trusted.gpg`, etc.
- it emails the backup every morning to my gmail.com account for off-site backups. Your backups are not only on-site but also on the same machine.

Here is the relevant script, parts of the which you might adapt:




{% include copyHeader.html %}
``` bash
#!/bin/sh
#
# NAME: daily-backup
# DESC: A .tar backup file is created, emailed and removed.
# DATE: Nov 25, 2017.
# CALL: WSL or Ubuntu calls from /etc/cron.daily/daily-backup
# PARM: No parameters but /etc/ssmtp/ssmtp.conf must be setup

# NOTE: Backup file name contains machine name + Distro
#       Same script for user with multiple dual boot laptops
#       Single machine should remove $HOSTNAME from name
#       Single distribution should remove $Distro

sleep 30 # Wait 30 seconds after boot

# Running under WSL (Windows Subsystem for Ubuntu)?
if cat /proc/version | grep Microsoft; then
    Distro="WSL"
else
    Distro="Ubuntu"
fi

today=$( date +%Y-%m-%d-%A )
/mnt/e/bin/daily-backup.sh Daily-$(hostname)-$Distro-backup-$today

```


----------

My gmail.com is only 35% full (out of 15 GB) so my daily backups can run for awhile more before I have to delete files. But rather than an "everything older than xxx" philosophy I'll use a grandfather-father-son strategy as outlined here: [Is it necessary to keep records of my backups?][2]. In summary:


-    Monday to Sunday (Daily backups) that get purged after 14 days
-    Sunday backups (Weekly backups) purged after 8 weeks
-    Last day of month backups (Monthly backups) purged after 18 months
-    Last day of year backups (Yearly backups) kept forever

My purging process will be complicated by the fact I'll have to learn Python and install a Python library to manage gmail folders.

If you don't want generational backups and want to purge files older than 2 months this answer will help: [Find not removing files in folders through bash script][3].

In summary:

``` bash
DAYS_TO_KEEP=60
find $BACKUP_DIR -maxdepth 1 -mtime +"$DAYS_TO_KEEP" -exec rm -rf {} \;

```


  [1]: https://askubuntu.com/questions/917562/backup-linux-configuration-scripts-and-documents-to-gmail
  [2]: https://askubuntu.com/questions/998082/is-it-necessary-to-keep-records-of-my-backups/998121#998121
  [3]: https://askubuntu.com/questions/553628/find-not-removing-files-in-folders-through-bash-script
