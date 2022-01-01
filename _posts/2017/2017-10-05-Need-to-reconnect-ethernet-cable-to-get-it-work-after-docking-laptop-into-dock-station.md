---
layout:       post
title:        >
    Need to reconnect ethernet cable to get it work after docking laptop into dock station
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/962090
type:         Answer
tags:         networking dell ethernet dockstation
created_date: !!str "2017-10-05 00:00:50"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "959"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    true
---

A few months ago an automatic update broke my Ethernet suspend/resume after it was working perfectly for 6 months or so. It happened to a few other users here around the same time.

The solution for me was to create a script that gets executed when resuming from suspend:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: r8169-reset
# PATH: /lib/systemd/system-sleep
# DESC: Reset Ethernet card after suspend, not working automatically
# DATE: Feb ?? 2017. Modified: Apr 30, 2017.

MYNAME=$0

restart_ethernet() {
   /usr/bin/logger $MYNAME 'restart_ethernet(r8169) BEGIN'
   /sbin/modprobe -v -r r8169
   # /sbin/modprobe -v -r mii
   /sbin/modprobe -v r8169
   /usr/bin/logger 'systemctl restart NetworkManager.service (SUPPRESED)'
   /usr/bin/logger $MYNAME 'restart_ethernet(r8169) END'
}

/usr/bin/logger $MYNAME 'case=[' ${1}' ]'
case "${1}/${2}" in
   hibernate|suspend|pre*)
      ;;
   resume|thaw|post*)
      restart_ethernet;;
esac

```



Save the script to `/lib/systemd/system-sleep/r8169-reset`. Of course change this script name to your actual driver name. Also change the driver kernel module name within the script. 

Note the line:

``` text
/usr/bin/logger 'systemctl restart NetworkManager.service (SUPPRESED)'

```

Sometimes simply restarting the network manager is all that is needed and you can try that too.

You'll need sudo powers to save the file. For good measure I always mark these scripts as `executable` using:

``` text
sudo chmod a+x /lib/systemd/system-sleep/r8169-reset

```

You can check `/var/log/syslog` to see output from the script.

Hope this works for you.
