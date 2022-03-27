---
layout:       post
title:        >
    What does `LOGFILE=${1:-/var/log/syslog}` do?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1144592
type:         Answer
tags:         command-line bash yad
created_date: 2019-05-19 20:05:53
edit_date:    2022-02-12 16:23:16
votes:        "7 "
favorites:    
views:        "433 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-19-What-does-_LOGFILE___1_-_var_log_syslog__-do_.md
toc:          false
navigation:   false
clipboard:    true
---

The command: `LOGFILE=${1:-/var/log/syslog}` is shorthand for:




``` bash
if [[ "$1" == "" ]]               # if parameter 1 is blank
then
    LOGFILE="/var/log/syslog"     # LOGFILE set to /var/log/syslog
else
    LOGFILE="$1"                  # LOGFILE set to parameter 1
fi
```

If parameter 1 is not passed you see:

[![yad-logfile 1.png][1]][1]

If you pass paraemeter 1:

``` bash
journalctl -b > /tmp/messages
yad-logfile /tmp/messages
```

you see:

[![yad-logfile 2.png][2]][2]


----------

The original code in [question link][3] was modified:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: yad-logfile
# DATE: May 19, 2019.

# From: https://sourceforge.net/p/yad-dialog/wiki/LogViewer/

# This script demonstrates new features of list dialog. Script displays content
# of specified log file and mark some special strings: with word "kernel" by
# setting italic font, with word "error" by light yellow background and with
# word "warn" by pink background 

LOGFILE=${1:-/var/log/syslog}

 PARSER='{font=""; color="#FFFFFF"}; \
/CRON/   {font="italic"}; \
/smartd/ {color="#FFF4B8"}; \
/upower/ {color="#FFD0D8"}; \
OFS="\n" {print $1 " " $2, $3, $4, substr($5,0,index($5,":")-1), \
substr($0,index($0,$6)), font, color; fflush()}'

cat $LOGFILE | awk "$PARSER" | \
yad --title="Log viewer" --window-icon=logviewer \
    --button=gtk-close --geometry 600x350 \
    --list --text="Content of $LOGFILE" \
    --column Date --column Time --column Host \
    --column Tag --column Message:TIP \
    --column @font@ --column @back@

exit $?
```


  [1]: https://i.stack.imgur.com/QOC4U.png
  [2]: https://i.stack.imgur.com/HdWK5.png
  [3]: https://sourceforge.net/p/yad-dialog/wiki/LogViewer/
