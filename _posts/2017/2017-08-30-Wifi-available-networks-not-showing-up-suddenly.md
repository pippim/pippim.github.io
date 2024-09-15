---
layout:       post
title:        >
    Wifi available networks not showing up suddenly
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/951422
type:         Answer
tags:         wireless
created_date: 2017-08-30 23:10:24
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,330 "
accepted:     
uploaded:     2024-09-15 11:08:07
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-08-30-Wifi-available-networks-not-showing-up-suddenly.md
toc:          false
navigation:   false
clipboard:    false
---

# Reset WiFi after long suspend period

A few months ago some of us discovered the network card (Ethernet) and wifi card would not reconnect if the laptop was suspended for a long period (+2 hours IIRC). For the 8 months prior to that, suspending and resuming worked perfectly.

This script is written for iwlwifi` which is the common Intel driver name. If your's is different change that name below:

``` sh
#!/bin/sh

# NAME: /lib/systemd/system-sleep/iwlwifi-reset
# DESC: Resets Intel WiFi which can be flakey after a long suspend.
# DATE: Apr 1, 2017. Modified August 30, 2017.

MYNAME=$0

exit

restart_wifi() {
    /usr/bin/logger $MYNAME 'restart_wifi BEGIN'
    /sbin/modprobe -v -r iwldvm # This removes iwlwifi too
    /sbin/modprobe -v iwlwifi   # This starts iwldvm too
#    systemctl restart NetworkManager.service
    /usr/bin/logger 'systemctl restart NetworkManager.service (SUPPRESSED)'
    /usr/bin/logger $MYNAME 'restart_wifi END'
}

/usr/bin/logger $MYNAME 'case=[' ${1}' ]'
case "${1}/${2}" in
    hibernate|suspend|pre*)
      ;;
    resume|thaw|post*)
      restart_wifi;;
esac
```

**NOTE:** Sometimes simply resetting network manager is all that is needed. In that case un-comment the line above by removing `#`. Then comment out the two lines above it by putting `#` at the beginning of those two lines.

You'll need to create this script, called `iwlwifi-reset`, with `sudo` powers and save it into the directory `/lib/systemd/system-sleep`.  Then mark it executable using:

``` 
chmod a+x /lib/systemd/system-sleep/iwlwifi-reset
```

