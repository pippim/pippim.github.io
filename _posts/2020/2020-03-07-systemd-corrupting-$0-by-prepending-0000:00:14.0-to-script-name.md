---
layout:       post
title:        >
    systemd corrupting $0 by prepending 0000:00:14.0 to script name
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/571712
type:         Answer
tags:         bash systemd suspend
created_date: 2020-03-07 20:03:28
edit_date:    2020-06-11 14:16:50
votes:        "1 "
favorites:    
views:        "53 "
accepted:     Accepted
uploaded:     2022-01-09 05:43:54
toc:          false
navigation:   false
clipboard:    true
---

# Systemd brings down Network Manager first

Even after correcting the error message by not disconnecting USB bus during suspend the issues remain you cannot send a WiFi command during suspend.

Network Manager is the first service that is brought down during suspend / hibernate and shutdown. If you want to send a WiFi radio signal to a device during those times you need to [read this][1].

# Move your script out of Systemd "hacks"

To fix my problem I created the script:

``` 
/etc/NetworkManager/dispatcher.d/pre-down.d/smartplug_off

```

The script must be marked executable (`chmod a+x scriptname`) and for me it contains:


{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: smartplug_off
# PATH: /etc/NetworkManager/dispatcher.d/pre-down.d
# DESC: Turn off smartplug light power for TV light
# DATE: March 7, 2020.

# CALL: Called by Network Manager before going down. Network manager in turn
#       is called by systemd during suspend/hibernate/shutdown

# NOTE: myisp.sh and hs100.sh must be installed for hs100 tp-link power plug.
#       https://developer.gnome.org/NetworkManager/stable/NetworkManager.html

PlugName="192.168.0.15"

status=$(hs100.sh -i "$PlugName" check | cut -f2)
if [ $status == "OFF" ] ; then
    : # Nothing to do already off
elif [ $status == "ON" ] ; then
    hs100.sh -i "$PlugName" off
else
    echo Error hs100.sh not responding check connection and IP "$PlugName".
fi
```




  [1]: https://developer.gnome.org/NetworkManager/stable/NetworkManager.html
