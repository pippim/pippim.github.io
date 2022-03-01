---
layout:       post
title:        >
    What does NetworkManager-wait-online.service do?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1018731
type:         Answer
tags:         network-manager 17.10
created_date: 2018-03-23 23:35:51
edit_date:    2020-06-12 14:37:07
votes:        "65 "
favorites:    
views:        "85,281 "
accepted:     Accepted
uploaded:     2022-02-28 18:43:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-23-What-does-NetworkManager-wait-online.service-do_.md
toc:          false
navigation:   false
clipboard:    false
---

## Some code runs off the network

In some multi-user environments part of the boot-up process can come from the network. For this case `systemd` defaults to waiting for the network to come on-line before certain steps are taken.

## Majority of Desktop Users

Unlike some multi-user environments most Ubuntu desktop users have the Operating System and drivers on their hard disks, SSDs or Live Boot USBs. 

There is a glitch where some users wait an extremely long time for network to come up during boot. In this case the recommendations is to set the maximum wait time to 30 seconds. A better way is to simply disable the service at boot time.

For many users 10 to 15 seconds can be sliced off the parallel boot time by using:

``` 
sudo systemctl disable NetworkManager-wait-online.service
```

After you sign on you will likely get a message bubble stating you've now been connected to the network (WiFi or Ethernet access to Internet).
