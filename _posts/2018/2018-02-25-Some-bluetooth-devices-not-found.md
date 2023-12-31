---
layout:       post
title:        >
    Some bluetooth devices not found
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1009714
type:         Answer
tags:         16.04 drivers bluetooth firmware
created_date: 2018-02-25 19:26:01
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "5,937 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-25-Some-bluetooth-devices-not-found.md
toc:          false
navigation:   false
clipboard:    false
---

# Bluetooth devices need to be paired

Before a bluetooth device can be used it needs to be paired to your Atheros WiFi card. [These instructions][1] give detailed steps.

You will also need to turn over your [$8.16 bluetooth mouse][2] from China. There are what appears to be a rocker switch and a push button. Use one of these (the web page doesn't say which one) to activate the pairing function.

Also make sure `tlp` isn't turning off bluetooth to save power: [Connecting Bluetooth mouse][3]

The [official / technical instructions][4] are here but not as easy to use as the first link I provided.

Many users find bluetooth setup frustrating and time-consuming. The best method for wireless mice and keyboards (IMO) is to use IR technology from Logitech, Microsoft and other name brand manufacturers.


  [1]: https://www.maketecheasier.com/setup-bluetooth-in-linux/
  [2]: https://www.ebay.com/itm/122781287068?ViewItem=&item=122781287068
  [3]: https://askubuntu.com/questions/853507/connecting-bluetooth-mouse
  [4]: https://help.ubuntu.com/stable/ubuntu-help/bluetooth-connect-device.html
