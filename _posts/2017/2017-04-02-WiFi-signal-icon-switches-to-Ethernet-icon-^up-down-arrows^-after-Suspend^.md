---
layout:       post
title:        >
    WiFi signal icon switches to Ethernet icon (up down arrows) after Suspend?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/899304
type:         Answer
tags:         networking 16.04 wireless suspend ethernet
created_date: 2017-04-02 00:44:55
edit_date:    2020-06-12 14:37:07
votes:        "5 "
favorites:    
views:        "2,889 "
accepted:     Accepted
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-04-02-WiFi-signal-icon-switches-to-Ethernet-icon-^up-down-arrows^-after-Suspend^.md
toc:          false
navigation:   false
clipboard:    true
---

# Automatic Method

Using sudo powers create the file `/lib/systemd/system-sleep/iwlwifi-reset` containing:

{% include copyHeader.html %}
``` 
#!/bin/sh

# NAME: /lib/systemd/system-sleep/iwlwifi-reset
# DESC: Resets Intel WiFi after a long suspend.
# DATE: Apr 1, 2017. Modified April 8, 2017.

# NOTE: Per AU comment restart network.

MYNAME=$0

restart_wifi() {
    /usr/bin/logger $MYNAME 'restart_wifi BEGIN'
#    /sbin/modprobe -v -r iwldvm # This removes iwlwifi too
#    /sbin/modprobe -v iwlwifi   # This starts iwldvm too
    systemctl restart NetworkManager.service
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

Mark the script as executable using:

``` 
sudo chmod a+x /lib/systemd/system-sleep/iwlwifi-reset
```

To check execution of the script after waking up from suspend use:

``` 
cat /var/log/syslog | grep iwlwifi
```

Don't get too excited if it seems to work during testing because there are times when this script works with a short suspend but doesn't work after a long suspend.

If this doesn't work, before trying the **Manual Method** in the next section, place the command `sleep 5` before the line `restart_wifi;;`.

# Manual Method

If the automatic method isn't working using sudo powers create the script `/usr/local/bin/iwlwifi-reset` containing:

``` 
#!/bin/sh

# NAME: /usr/lib/bin/iwlwifi-reset
# DESC: Manually reset Intel WiFi.
# DATE: Apr 1, 2017. Modified April 8, 2017.
# NOTE: Must call using SUDO POWERS.

MYNAME=$0

/usr/bin/logger $MYNAME 'restart_wifi BEGIN'
# modprobe -r iwldvm    # This removes iwlwifi too
# modprobe iwlwifi      # This starts iwldvm too
systemctl restart NetworkManager.service
/usr/bin/logger $MYNAME 'restart_wifi END'
```

Mark the script as executable using:

``` 
sudo chmod a+x /usr/local/bin/iwlwifi-reset
```

As described in the last section you can check **/var/log/syslog** for messages when this script is run but you will see any error messages in your terminal anyway.

To call this script use:

``` 
sudo iwlwifi-reset
```

You don't need to specify the directory because `/usr/local/bin` is in the terminal's command search path.


----------

**Edit April 8, 2017** As per OP comment and [this How-To][1], revisions to script were made. Instead of removing and reinserting kernel modules, restarting network services were used.


  [1]: https://linuxconfig.org/how-to-restart-network-on-ubuntu-16-04-xenial-xerus-linux
