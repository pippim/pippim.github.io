---
layout:       post
title:        >
    Every time I change networks, DNS cache has the wrong IP. How to fix automatically every time?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1051686
type:         Answer
tags:         networking dns intranet
created_date: 2018-07-03 04:08:14
edit_date:    2018-07-04 02:06:52
votes:        "3 "
favorites:    
views:        "247 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

This systemd script restarts Network Manager when resuming from suspend.



``` bash
#!/bin/sh

MYNAME=$0

restart_network() {
    /usr/bin/logger $MYNAME 'restart_network BEGIN'
    systemctl restart NetworkManager.service
    /usr/bin/logger $MYNAME 'restart_network END'
}

/usr/bin/logger $MYNAME 'case=[' ${1}' ]'
case "${1}/${2}" in
    hibernate|suspend|pre*)
      ;;
    resume|thaw|post*)
      restart_network;;
esac

```

You'll need to create this script, called `network-reset`, with sudo powers and save it into the directory `/lib/systemd/system-sleep`. Then mark it executable using:

``` bash
chmod a+x /lib/systemd/system-sleep/network-reset

```

The `logger` commands above allow you to audit results by running `journalctl` or by looking in `/var/log/syslog`.
