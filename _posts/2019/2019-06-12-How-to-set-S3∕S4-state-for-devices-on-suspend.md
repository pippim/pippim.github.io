---
layout:       post
title:        >
    How to set S3∕S4 state for devices on suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1150514
type:         Answer
tags:         usb lubuntu suspend power-management
created_date: 2019-06-12 10:56:18
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,787 "
accepted:     Accepted
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    true
---

I had a similar problem recently when all of a sudden suspend stopped working due to USB. I wrote this script to fix it:

<!-- Language-all: lang-bash -->

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

Place the script in `/lib/systemd/system-sleep/custom-xhci_hcd` and mark it executable with:

``` 
chmod a+x /lib/systemd/system-sleep/custom-xhci_hcd

```

On next reboot script is activated.

----------

## Suspend message log

Use `journalctl -xe` and press <kbd>Page Up</kbd> numerous times to see the suspend messages:

``` 
Jun 14 17:30:51 alien systemd-sleep[16326]: /lib/systemd/system-sleep/custom-xhci_hcd: Going
Jun 14 17:30:51 alien kernel: xhci_hcd 0000:00:14.0: remove, state 4
Jun 14 17:30:51 alien kernel: usb usb2: USB disconnect, device number 1
Jun 14 17:30:51 alien kernel: usb 2-1: USB disconnect, device number 2
Jun 14 17:30:51 alien kernel: usb 2-1.4: USB disconnect, device number 3
Jun 14 17:30:51 alien kernel: xhci_hcd 0000:00:14.0: USB bus 2 deregistered
Jun 14 17:30:51 alien kernel: xhci_hcd 0000:00:14.0: remove, state 1
Jun 14 17:30:51 alien kernel: usb usb1: USB disconnect, device number 1
Jun 14 17:30:51 alien kernel: usb 1-1: USB disconnect, device number 2
Jun 14 17:30:51 alien kernel: usb 1-1.1: USB disconnect, device number 4
Jun 14 17:30:51 alien kernel: usblp1: removed
Jun 14 17:30:51 alien kernel: usb 1-1.2: USB disconnect, device number 6

```

Then press <kbd>Page Down</kbd> numerous times to see the resume messages:

{% include copyHeader.html %}
``` 
Jun 14 17:31:07 alien systemd-sleep[16326]: /lib/systemd/system-sleep/custom-xhci_hcd: Wakin
Jun 14 17:31:07 alien systemd-sleep[16326]: Selected interface 'p2p-dev-wlp60s0'
Jun 14 17:31:07 alien systemd-sleep[16326]: OK
Jun 14 17:31:07 alien systemd-sleep[16326]: /lib/systemd/system-sleep/lag-suspend.sh: Waking
Jun 14 17:31:07 alien kernel: PM: suspend exit
Jun 14 17:31:07 alien kernel: xhci_hcd 0000:00:14.0: xHCI Host Controller
Jun 14 17:31:07 alien kernel: xhci_hcd 0000:00:14.0: new USB bus registered, assigned bus nu
Jun 14 17:31:07 alien kernel: xhci_hcd 0000:00:14.0: hcc params 0x200077c1 hci version 0x100
Jun 14 17:31:07 alien kernel: xhci_hcd 0000:00:14.0: cache line size of 128 is not supported
Jun 14 17:31:07 alien kernel: usb usb1: New USB device found, idVendor=1d6b, idProduct=0002
Jun 14 17:31:07 alien kernel: usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumb
Jun 14 17:31:07 alien kernel: usb usb1: Product: xHCI Host Controller
Jun 14 17:31:07 alien kernel: usb usb1: Manufacturer: Linux 4.14.114-0414114-generic xhci-hc
Jun 14 17:31:07 alien kernel: usb usb1: SerialNumber: 0000:00:14.0
Jun 14 17:31:07 alien kernel: hub 1-0:1.0: USB hub found
Jun 14 17:31:07 alien kernel: hub 1-0:1.0: 16 ports detected
Jun 14 17:31:07 alien kernel: xhci_hcd 0000:00:14.0: xHCI Host Controller
Jun 14 17:31:07 alien kernel: xhci_hcd 0000:00:14.0: new USB bus registered, assigned bus nu
Jun 14 17:31:07 alien kernel: xhci_hcd 0000:00:14.0: Host supports USB 3.0  SuperSpeed
Jun 14 17:31:07 alien kernel: usb usb2: New USB device found, idVendor=1d6b, idProduct=0003
Jun 14 17:31:07 alien kernel: usb usb2: New USB device strings: Mfr=3, Product=2, SerialNumb
Jun 14 17:31:07 alien kernel: usb usb2: Product: xHCI Host Controller
Jun 14 17:31:07 alien kernel: usb usb2: Manufacturer: Linux 4.14.114-0414114-generic xhci-hc
Jun 14 17:31:07 alien kernel: usb usb2: SerialNumber: 0000:00:14.0
Jun 14 17:31:07 alien kernel: hub 2-0:1.0: USB hub found
Jun 14 17:31:07 alien kernel: hub 2-0:1.0: 8 ports detected
Jun 14 17:31:07 alien eyesome[16633]: Wakeup: Called from suspend.

```

