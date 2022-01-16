---
layout:       post
title:        >
    Wakes from suspend immediately when bluetooth device disconnected
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1089078
type:         Answer
tags:         18.04 kubuntu suspend bluetooth
created_date: 2018-11-01 02:49:00
edit_date:    
votes:        "3 "
favorites:    
views:        "2,807 "
accepted:     
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-11-01-Wakes-from-suspend-immediately-when-bluetooth-device-disconnected.md
toc:          false
navigation:   false
clipboard:    true
---

My laptop which used to suspend OK most of the time started having problems last week. Perhaps due to a faulty cable. I created a bash script which suspends and resumes faster than before and more reliably.

<!-- Language-all: lang-bash -->

Use this command: 

``` 
sudo -H gedit /lib/systemd/system-sleep/custom-xhci_hcd
```

Copy and paste the following into the editor:

{% include copyHeader.html %}
``` 
#!/bin/bash

# Original script was using /bin/sh but shellcheck reporting warnings.

# NAME: custom-xhci_hcd
# PATH: /lib/systemd/system-sleep
# CALL: Called from SystemD automatically
# DESC: Suspend broken for USB3.0 as of Oct 25/2018 various kernels all at once

# DATE: Oct 28 2018.

# NOTE: From comment #61 at: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/522998

TMPLIST=/tmp/xhci-dev-list

# Original script was: case "${1}" in hibernate|suspend)

case $1/$2 in
  pre/*)
    echo "$0: Going to $2..."
    echo -n '' > $TMPLIST
          for i in `ls /sys/bus/pci/drivers/xhci_hcd/ | egrep '[0-9a-z]+\:[0-9a-z]+\:.*$'`; do
              # Unbind xhci_hcd for first device XXXX:XX:XX.X:
               echo -n "$i" | tee /sys/bus/pci/drivers/xhci_hcd/unbind
           echo "$i" >> $TMPLIST
          done
        ;;
  post/*)
    echo "$0: Waking up from $2..."
    for i in `cat $TMPLIST`; do
              # Bind xhci_hcd for first device XXXX:XX:XX.X:
              echo -n "$i" | tee /sys/bus/pci/drivers/xhci_hcd/bind
    done
    rm $TMPLIST
        ;;
esac
```

Then save the file and exit `gedit`. 

Mark the script as executable using:

``` 
sudo chmod a+x /lib/systemd/system-sleep/custom-xhci_hcd
```

Now your suspend/resume problems should go away. If not hopefully someone else posts their solution.
