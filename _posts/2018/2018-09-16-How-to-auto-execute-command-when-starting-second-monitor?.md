---
layout:       post
title:        >
    How to auto execute command when starting second monitor?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1075809
type:         Answer
tags:         gnome multiple-monitors nvidia-geforce
created_date: 2018-09-16 17:30:00
edit_date:    
votes:        "2 "
favorites:    
views:        "377 "
accepted:     
uploaded:     2022-01-09 09:42:38
toc:          false
navigation:   false
clipboard:    true
---

This is a work-in-progress script I'm developing for a package to control monitor brightness and gamma based on sunrise/sunset times.

When closing the lid of the laptop, xrandr resets all external monitors to full brightness. The script below detects xrandr changes to `/sys/class/drm/?/status` file using `inotify` which is a more efficient polling method than sleeping every second.

The script below contains credits to original authors and portions are commented out that may be deleted in the future or changed.

Use `ll /sys/class/drm/*/status` to discover your monitor card name(s). Then replace `MONITOR=` below with the appropriate name.

<!-- Language-all: lang-bash -->

## Bash script

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: monitory-eyesome.sh
# PATH: /usr/lib/bin
# DESC: Instantly adjust display brightness when xrandr reconfigures monitors
#       and resets them to full brightness.

# CALL: /etc/cron.d calls this script during boot.
#       Called from command line for testing/debugging.

# DATE: Sepetmber ??, 2018.

# PARM: No parameters yet, but $1 will be /sys/class/drm/<MONITOR>/status
#       in the future. ie $1 = <MONITOR>

# source eyesome-src.sh # Common code for eyesome___.sh bash scripts

# Must have the inotify-tools package.
command -v inotifywait >/dev/null 2>&1 || { echo >&2 \
        "inotify-tools package required but it is not installed.  Aborting."; \
        exit 2; }

# Copied from: https://bbs.archlinux.org/viewtopic.php?id=171655
#inspired of: 
#   http://unix.stackexchange.com/questions/4489/a-tool-for-automatically-applying-randr-configuration-when-external-display-is-p
#   http://ozlabs.org/~jk/docs/mergefb/
#   http://superuser.com/questions/181517/how-to-execute-a-command-whenever-a-file-changes/181543#181543

export MONITOR="/sys/class/drm/card1-DP-1/status"
echo "$0: $(date) Monitoring: $MONITOR" > /tmp/monitor-eyesome.sh
while inotifywait -e modify,create,delete,open,close,close_write,access \
        "$MONITOR";

dmode="$(cat "$MONITOR")"

do
    echo "$0: $(date) $dmode" >> /tmp/monitor-eyesome.sh
#    if [ "${dmode}" = disconnected ]; then
#         /usr/bin/xrandr --auto
#         echo "${dmode}"
#    elif [ "${dmode}" = connected ];then
#         /usr/bin/xrandr --output VGA1 --auto --right-of LVDS1
#         echo "${dmode}"
#    else /usr/bin/xrandr --auto
#         echo "${dmode}"
#    fi
done

```

## Sample output when closing laptop lid

``` 
$ sudo ./monitor-eyesome.sh
Setting up watches.
Watches established.
/sys/class/drm/card1-DP-1/status OPEN 
Setting up watches.
Watches established.
/sys/class/drm/card1-DP-1/status OPEN 
Setting up watches.
Watches established.
/sys/class/drm/card1-DP-1/status OPEN 
Setting up watches.
Watches established.

```

## Sample output of log file

``` 
$ cat /tmp/mon*
./monitor-eyesome.sh: Sun Sep 16 11:16:51 MDT 2018 Monitoring: /sys/class/drm/card1-DP-1/status
./monitor-eyesome.sh: Sun Sep 16 11:16:55 MDT 2018 connected
./monitor-eyesome.sh: Sun Sep 16 11:16:56 MDT 2018 connected
./monitor-eyesome.sh: Sun Sep 16 11:16:56 MDT 2018 connected

```

## Summary

This script was created a few minutes ago (Sept 16 2018 @ 11:30am MST). I'll update it as the project progresses.
