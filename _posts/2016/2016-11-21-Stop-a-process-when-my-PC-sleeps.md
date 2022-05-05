---
layout:       post
title:        >
    Stop a process when my PC sleeps
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/851917
type:         Answer
tags:         suspend
created_date: 2016-11-21 12:53:08
edit_date:    2017-11-29 21:21:06
votes:        "3 "
favorites:    
views:        "820 "
accepted:     Accepted
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-21-Stop-a-process-when-my-PC-sleeps.md
toc:          false
navigation:   false
clipboard:    false
---

## Method 1 - using a script within `/lib/systemd/system-sleep` directory

Create a script in `/lib/systemd/system-sleep` that looks like this:



``` sh
#!/bin/sh

case $1/$2 in
  pre/*)
    echo "Going to $2..."
    killall libinput-debug-events
    ;;
  post/*)
    echo "Waking up from $2..."
    # Place your post suspend (resume) commands here, or `exit 0` if no post suspend action required
    sleep 2
    libinput-gestures-setup start
    ;;
esac
```

To ensure the script is created with the right permissions, copy and existing script and then edit it:

``` sh
cd /lib/systemd/system-sleep
sudo cp wpasupplicant tv_refresh
gksu gedit tv_refresh
```

The `sleep 2` pause may be unnecessary for you but for my setup it was necessary restoring sound from laptop back to HDMI TV.

The `echo` lines are optional but are handy because they show up in `/var/log/syslog`.

## Method 2 - using `systemd` services for `root` or `user`

From: ([archlinux - Power Management][1]) we get detailed instructions for suspending and resuming either under `root` powers or `user` powers.

### Suspend/resume service files

Service files can be hooked into suspend.target, hibernate.target and sleep.target to execute actions before or after suspend/hibernate. Separate files should be created for user actions and root/system actions. Enable the suspend@user and resume@user services to have them started at boot. Examples:

### Suspend

``` sh
/etc/systemd/system/suspend@.service
[Unit]
Description=User suspend actions
Before=sleep.target

[Service]
User=%I
Type=simple
Environment=DISPLAY=:0
ExecStartPre= -/usr/bin/pkill -u %u unison ; /usr/local/bin/music.sh stop ; /usr/bin/mysql -e 'slave stop'
ExecStart=/usr/bin/sflock
ExecStartPost=/usr/bin/sleep 1

[Install]
WantedBy=sleep.target
```

### Resume

``` sh
/etc/systemd/system/resume@.service
[Unit]
Description=User resume actions
After=suspend.target

[Service]
User=%I
Type=simple
ExecStartPre=/usr/local/bin/ssh-connect.sh
ExecStart=/usr/bin/mysql -e 'slave start'

[Install]
WantedBy=suspend.target 
```


  [1]: https://wiki.archlinux.org/index.php/Power_management



