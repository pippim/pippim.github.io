---
layout:       post
title:        >
    Cannot access to the internet via wireless by QCA6174 802.11ac Wireless Network Adapter on Ubuntu 14.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1009217
type:         Answer
tags:         14.04 networking drivers
created_date: 2018-02-24 04:04:14
edit_date:    2018-02-26 16:17:37
votes:        "1 "
favorites:    
views:        "772 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-24-Cannot-access-to-the-internet-via-wireless-by-QCA6174-802.11ac-Wireless-Network-Adapter-on-Ubuntu-14.04.md
toc:          false
navigation:   false
clipboard:    false
---

## Feb 26/2018 Update:

There appears to be an [old bug][1] with 14.04 and ath10k driver. This has not been fixed yet in the main repositories. **First try chili555's suggestion.** If that doesn't work then review the bug report and try the fix there. Briefly bug work around fix is to:

``` 
sudo mkdir -p /lib/firmware/ath10k/QCA6174/hw3.0/

sudo rm /lib/firmware/ath10k/QCA6174/hw3.0/* 2> /dev/null

sudo wget -O /lib/firmware/ath10k/QCA6174/hw3.0/board.bin https://github.com/kvalo/ath10k-firmware/blob/master/QCA6174/hw3.0/board.bin?raw=true

sudo wget -O /lib/firmware/ath10k/QCA6174/hw3.0/board-2.bin https://github.com/kvalo/ath10k-firmware/blob/master/QCA6174/hw3.0/board-2.bin?raw=true

sudo wget -O /lib/firmware/ath10k/QCA6174/hw3.0/firmware-4.bin https://github.com/kvalo/ath10k-firmware/blob/master/QCA6174/hw3.0/firmware-4.bin_WLAN.RM.2.0-00180-QCARMSWPZ-1?raw=true
```

You will see comments from me in the bug report between #88 and #93. The developer points out being on HWE (Hardware Enablement Stack) could have automatically fixed the problem within Ubuntu 16.04. I'm not sure about Ubuntu 14.04 though.

From my point of view the problem with HWE is it automatically updates kernels for Metldown and Spectre that caused problems for many people: [Is it safe to let &quot;Sotware Updater&quot; install all suggested updates?][2]

Comment #95 in the bug report mentions:

> just found the latest firmware is already in xenial-proposed  
> linux-firmware (1.157.15) xenial; urgency=medium  

----------

## Original Post:

The command output of: `sudo lshw -class network` shows your network Wifi card as "disabled". In the animation below the same model of card is initially shown as disabled. Then from the system tray menu the Network icon is clicked. From the drop down menu the "Enable WiFi" option is clicked on. Then `lshw` is run again and the Wifi card is no longer disabled:

[![enable wifi.gif][3]][3]


  [1]: https://bugs.launchpad.net/ubuntu/+source/linux-firmware/+bug/1520343
  [2]: {% post_url /2018/2018-02-19-Is-it-safe-to-let-_Sotware-Updater_-install-all-suggested-updates_ %}
  [3]: https://i.stack.imgur.com/Rmtz9.gif
