---
layout:       post
title:        How to run a script at boot and then every 30 minutes
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191405
type:         Answer
tags:         server scripts cron automation eyesome
created_date: 2019-11-24 21:15:24
edit_date:    2020-06-12 14:37:07
votes:        1
favorites:    
views:        1,768
accepted:     Accepted
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

Write a control file and place it in `/etc/cron.d/myscriptrun`
<!-- Language-all: lang-bash -->

``` 
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
@reboot   root    /usr/local/bin/myscript.sh

```

**Do not** make this file executable. It is a control file not a script.


----------


Write a bash script and place it in `/usr/local/bin/myscript.sh`

``` 
#!/bin/bash

while true ; do

    python3 /myScriptPath/myScriptName.py &
    sleep 30m

done

```

Make it executable `chmod a+x /etc/cron.d/bashscript`.

The `&` starts the job in the background so the script will sleep for exactly 30 minutes. You can remove the `&` and that changes the script to sleep 30 minutes after the job ends. Meaning jobs no longer start 30 minutes apart.


----------


# Cron runs your job

You don't need to start the script, cron does that automatically at boot time. To monitor status use:

``` 
$ systemctl status cron*
● cron.service - Regular background program processing daemon
   Loaded: loaded (/lib/systemd/system/cron.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2019-11-12 06:01:27 MST; 1 weeks 6 days ago
     Docs: man:cron(8)
 Main PID: 1115 (cron)
   CGroup: /system.slice/cron.service
           ├─1115 /usr/sbin/cron -f
           ├─1132 /usr/sbin/CRON -f
           ├─1138 /bin/sh -c    /usr/local/bin/eyesome.sh
           ├─1142 /bin/bash /usr/local/bin/eyesome.sh
           ├─1160 /bin/bash /usr/local/bin/eyesome-dbus.sh
           ├─1168 dbus-monitor --system type=method_call, interface=org.freedesktop.ColorManag
           ├─1169 /bin/bash /usr/local/bin/eyesome-dbus.sh
           └─6575 sleep 57207

```

Your display will have `cron` at the top and `sleep` at the bottom but will not have `eyesome` stuff in the middle, unless you are using that sunrise/sunset multiple monitor brightness/gamma transitioning software.

To see when your python job runs at it's next 30 minute interval run an inquiry on the process ID of the `sleep` command (which is `6575` in the example above):

``` 
$ remaining_sleep_time 6575
55923

$ echo $((55923/60))
932

```

The time remaining is 55923 seconds divided by 60 seconds in a minute = 932 minutes before the job wakes up. To get a copy of `remaining_sleep_time` function see:

- [How to determine the amount of time left in a “sleep”?][1]


  [1]: https://unix.stackexchange.com/a/314777/200094
