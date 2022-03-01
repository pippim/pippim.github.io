---
layout:       post
title:        >
    How to prevent wifi sleep after suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035370
type:         Answer
tags:         networking wireless suspend
created_date: 2018-05-12 15:32:16
edit_date:    2019-04-05 10:58:19
votes:        "17 "
favorites:    
views:        "23,300 "
accepted:     Accepted
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-12-How-to-prevent-wifi-sleep-after-suspend.md
toc:          false
navigation:   false
clipboard:    true
---

There are two ways of enabling WiFi after sleep. The first is a common patch to Network Manager as you can see I've made by listing the file:


Turn off or enable power savings as illustrated below:

``` bash
$ cat /etc/NetworkManager/conf.d/default-wifi-powersave-on.conf
[connection]
wifi.powersave = 3
# Slow sleep fix: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1670041
#wifi.powersave = 2
```

- Edit the Network Manager file shown above.
- Change `WiFi.powersave` from `2` to `3` (Enable power saving).
- If it's already set to `3` try setting it to `2` (Disable power saving).
- After saving the file run `sudo systemctl restart NetworkManager`

The second is a `systemd` script which reloads the WiFi kernel module when resuming from suspend. It comes from this answer: [Wifi available networks not showing up suddenly](Wifi available networks not showing up suddenly)

This script is written for iwlwifi` which is the common Intel driver name. If your's is different change that name below:

{% include copyHeader.html %}
``` sh
#!/bin/sh

# NAME: /lib/systemd/system-sleep/iwlwifi-reset
# DESC: Resets Intel WiFi which can be flakey after a long suspend.
# DATE: Apr 1, 2017. Modified August 30, 2017.

MYNAME=$0

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

``` bash
chmod a+x /lib/systemd/system-sleep/iwlwifi-reset
```
