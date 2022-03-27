---
layout:       post
title:        >
    How to turn off the USB power to my mouse, when I suspend the notebook?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/836725
type:         Answer
tags:         usb kernel mouse suspend power-management
created_date: 2016-10-14 01:04:17
edit_date:    2020-06-12 14:37:07
votes:        "7 "
favorites:    
views:        "5,875 "
accepted:     Accepted
uploaded:     2022-03-27 10:04:10
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-14-How-to-turn-off-the-USB-power-to-my-mouse_-when-I-suspend-the-notebook_.md
toc:          false
navigation:   false
clipboard:    true
---



The current stumbling block with OP links, follow up comments and proposed answers is the product ID is static `1b1a:7001` but the Bus and Device numbers keep changing.

# The solution

Create a script (any name you want) in the directory `/etc/pm/sleep.d/` and place the following in it:

{% include copyHeader.html %}
``` bash
#!/bin/bash
ZeroBUS=$(lsusb | grep 1b1a:7001 | cut -c  5-7 )

# Strip leading zeros
BUS=$(echo $ZeroBUS | sed 's/^0*//')

# Build "usbX" usb number
USB=usb$BUS

case $1 in
     suspend|suspend_hybrid|hibernate)
     echo "Powering off: " $USB
        echo $USB | sudo tee /sys/bus/usb/drivers/usb/unbind
        ;;
     resume|thaw)
        # No need to do anything here, kernel unsuspends USB devices
        # Show how to power on for interest sake but since device is
        # powered off the usb number will be blank.
        echo "Powering on: " $USB
        echo $USB | sudo tee /sys/bus/usb/drivers/usb/bind
        ;;
esac
```

Mark the file as executable with `sudo chmod +x file_name` where "file_name" is the name you chose.

# The explanation

This solution powers off the entire USB hub which in my case meant phone, wireless mouse, wireless keyboard, etc. When calling the script from terminal prompt the sudo password needs to be entered. Hopefully when called from systemd sudo powers are inherited. I could not test this though because I don't have a wired mouse. Therefore additional refinement may be necessary for sudo powers.

The power isn't physically cut when the BIOS is providing constant 5V power supply, rather the devices on the bus are told to turn themselves off. In my case the wireless keyboard and mouse stopped working and had to resort to laptop keyboard and touchpad to return power back on.

You can test this manually by calling the script and passing the parameters "suspend". Passing the parameter "resume" accomplishes nothing because the device is powered off it has no device ID to turn it back on.


----------


# Easier solution power off all USB ports

I recently ran into a problem where an unknown port was preventing laptop from suspending. I found this solution (credit in code) which I modified.

Create the file `/lib/systemd/system-sleep/custom-xhci_hcd` using `sudo` powers and insert this code:

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

