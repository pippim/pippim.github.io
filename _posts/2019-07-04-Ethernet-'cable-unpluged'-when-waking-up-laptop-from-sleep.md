---
layout:       post
title:        Ethernet 'cable unpluged' when waking up laptop from sleep
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1156038
type:         Answer
tags:         networking 18.04 suspend ethernet
created_date: 2019-07-04 23:52:22
edit_date:    
votes:        0
favorites:    
views:        51
accepted:     Accepted
uploaded:     2021-12-29 16:51:17
toc:          false
navigation:   false
clipboard:    true
---

Same thing happened to me years ago on an older laptop and I used this script:

<!-- Language-all: lang-bash -->

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: r8169-reset
# PATH: /lib/systemd/system-sleep
# DESC: Reset Ethernet card after suspend, not working automatically
# DATE: Feb ?? 2017. Modified: Aug 5, 2018.

MYNAME=$0

restart_ethernet() {
   /usr/bin/logger $MYNAME 'restart_ethernet(r8169) BEGIN'
   /sbin/modprobe -v -r r8169
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

Place the script in the directory `/lib/systemd/system-sleep` with the name `r8169-reset`. Mark the script executable with the command

``` 
sudo chmod a+x /lib/systemd/system-sleep/r8169-reset

```

Reboot and script will run automatically with every resume after suspend.
