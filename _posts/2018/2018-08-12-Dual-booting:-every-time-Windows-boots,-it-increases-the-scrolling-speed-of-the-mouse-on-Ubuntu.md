---
layout:       post
title:        >
    Dual booting: every time Windows boots, it increases the scrolling speed of the mouse on Ubuntu
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064744
type:         Answer
tags:         dual-boot 18.04 mouse scrolling mouse-scroll grub
created_date: 2018-08-12 18:58:21
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "1,085 "
accepted:     
uploaded:     2022-01-09 16:04:07
toc:          false
navigation:   false
clipboard:    true
---

# Reset mouse

Windows has a habit of leaving devices in an unusual state when it reboots. It works fine when you reboot from Windows into Windows but there are problems rebooting from Windows into Grub and then into Ubuntu.

The OP's question is just one example where the mouse has incorrect scrolling speed. Other examples include Windows powering off Audio Cards, WiFi or Network adapters can also occur.

----------

Here is a new script I've tested and doesn't lock up the mouse/keyboard like the first script did.

<!-- Language-all: lang-bash -->

Add this script to `/usr/local/bin/reset-usb`:

{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: /usr/local/bin/reset-usb
# DATE: August 17, 2018.
# DESC: Written for Ask Ubuntu Question:
#       https://askubuntu.com/questions/1061754
#       Reboots / resets all USB devices including mouse & WiFi

if [[ $(id -u) != 0 ]]; then # root powers needed to call this script
    echo $0 must be called with sudo powers
    exit 1
fi

for i in /sys/bus/pci/drivers/[uoex]hci_hcd/*:*; do
  [ -e "$i" ] || continue
  echo "${i##*/}" > "${i%/*}/unbind"
  echo "${i##*/}" > "${i%/*}/bind"
done

systemctl restart NetworkManager.service

exit 0

```

Mark the file as executable with:

``` 
sudo chmod +x /usr/local/bin/reset-usb

```

Edit the file `/etc/rc.local` and insert these lines **before** the last line that says `exit 0`:

``` 
# Reboot / reset all USB devices
/usr/local/bin/reset-usb

```

**Credit**: [How do you reset a USB device from the command line?][1]

----------

**NOTE:** When internal USB devices are reset the WiFi / Bluetooth are reinitialized so `systemctl restart NetworkManager`.

  [1]: https://askubuntu.com/a/290519/307523
