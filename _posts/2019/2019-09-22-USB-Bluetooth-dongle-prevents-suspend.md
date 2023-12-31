---
layout:       post
title:        >
    USB Bluetooth dongle prevents suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1175861
type:         Answer
tags:         usb bluetooth suspend dongle
created_date: 2019-09-22 14:32:30
edit_date:    2019-09-27 21:57:29
votes:        "1 "
favorites:    
views:        "524 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-22-USB-Bluetooth-dongle-prevents-suspend.md
toc:          false
navigation:   false
clipboard:    false
---

## Power off device during suspend, power on during resume



From this answer:

- [How to turn off the USB power to my mouse, when I suspend the notebook?]({% post_url /2016/2016-10-14-How-to-turn-off-the-USB-power-to-my-mouse_-when-I-suspend-the-notebook_ %})

You can create a script called `/lib/systemd/system-sleep/cambridge.sh`

``` bash
#!/bin/bash
ZeroBUS1=$(lsusb | grep 0a12:0001 | cut -c  5-7 )
BUS1=$(echo $ZeroBUS1 | sed 's/^0*//') # Strip leading zeros
ZeroBUS2=$(lsusb | grep 0a12:0001 | cut -c  16-18 )
BUS2=$(echo $ZeroBUS2 | sed 's/^0*//') # Strip leading zeros
BUS="$BUS1"-"$BUS2"    

case $1 in
    suspend|suspend_hybrid|hibernate)
        echo "Powering off: $BUS"
        echo "$BUS" | sudo tee /sys/bus/usb/drivers/usb/unbind
        ;;
    resume|thaw)
        echo "Powering on: $BUS"
        echo "$BUS" | sudo tee /sys/bus/usb/drivers/usb/bind
        ;;
esac
```

Mark the file as executable with 

``` bash
sudo chmod a+x /lib/systemd/system-sleep/cambridge.sh
```

You may need to reboot for changes to take effect.
