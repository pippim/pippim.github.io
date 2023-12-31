---
layout:       post
title:        >
    Qualcomm Atheros QCA9377 dropping wifi
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1248076
type:         Answer
tags:         networking wireless atheros
created_date: 2020-06-08 04:25:12
edit_date:    
votes:        "1 "
favorites:    
views:        "3,246 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-08-Qualcomm-Atheros-QCA9377-dropping-wifi.md
toc:          false
navigation:   false
clipboard:    false
---

There is a large Q&A here:

- [\[Solved\] QCA9377 Wireless device not working after upgraded Linux 4.14.85-1][1]



After running `dmesg | grep -i firmware` and `dmesg | grep -i ath10k` amongst many other commands, the solution was this script:

``` bash
#!/bin/bash
sudo nmcli networking off
sleep 1
sudo systemctl stop NetworkManager
sleep 1
sudo ip link set wlp2s0 down
sleep 1
sudo modprobe -r ath10k_pci
sleep 2
sudo modprobe -r ath10k_core
sleep 2
sudo modprobe ath10k_pci
sleep 2
sudo ip link set wlp2s0 up
sleep 1
sudo systemctl start NetworkManager
sleep 2
sudo nmcli networking on
sleep 1
exit
```
Even if the script doesn't work for you, read the entire Q&A in case something else does.

  [1]: https://forum.manjaro.org/t/solved-qca9377-wireless-device-not-working-after-upgraded-linux-4-14-85-1/68194/20
