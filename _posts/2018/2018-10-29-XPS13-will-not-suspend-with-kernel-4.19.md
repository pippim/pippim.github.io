---
layout:       post
title:        >
    XPS13 will not suspend with kernel 4.19
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1088146
type:         Answer
tags:         18.04 kernel suspend xps
created_date: 2018-10-29 01:37:01
edit_date:    
votes:        "2 "
favorites:    
views:        "349 "
accepted:     
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-29-XPS13-will-not-suspend-with-kernel-4.19.md
toc:          false
navigation:   false
clipboard:    true
---

Although technically off-topic question, I had same problem today with Kernel `4.14.78-generic` which I installed to fix problems suspending with supported kernel `4.13.0-36-generic`.



I created this script: `/lib/systemd/system-sleep/custom-xhci_hcd`:

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

Then mark as executable using:

``` bash
sudo chmod a+x /lib/systemd/system-sleep/custom-xhci_hcd
```
