---
layout:       post
title:        >
    Strange suspension issues on macbook pro Ubuntu 18.04 LTS
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1140380
type:         Answer
tags:         suspend hibernate macbook
created_date: 2019-05-03 23:34:11
edit_date:    
votes:        "1 "
favorites:    
views:        "379 "
accepted:     Accepted
uploaded:     2022-03-20 10:46:14
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-03-Strange-suspension-issues-on-macbook-pro-Ubuntu-18.04-LTS.md
toc:          false
navigation:   false
clipboard:    true
---

# Power off / on all during suspend / resume

It's very difficult to isolate what is going on. One good chance of making everything work is with this script:



{% include copyHeader.html %}
``` bash
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

### Housekeeping

Create the script with root powers:

- `sudo -H gedit /lib/systemd/system-sleep/custom-xhci_hcd`

Insert text above and save file. Mark script as executable:

- `sudo chmod a+x /lib/systemd/system-sleep/custom-xhci_hcd`

### Reboot and test

If the script doesn't help remove it with:

- `sudo rm -f /lib/systemd/system-sleep/custom-xhci_hcd`
