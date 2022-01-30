---
layout:       post
title:        >
    How to tell if Ubuntu is using WiFi or Ethernet
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035548
type:         Answer
tags:         networking internet ethernet vnstat
created_date: 2018-05-13 01:57:44
edit_date:    2018-05-13 15:29:08
votes:        "2 "
favorites:    
views:        "2,453 "
accepted:     
uploaded:     2022-01-30 11:51:20
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-13-How-to-tell-if-Ubuntu-is-using-WiFi-or-Ethernet.md
toc:          false
navigation:   false
clipboard:    false
---

Ubuntu will use both your Wireless and your Ethernet at the same time. I use a program called `vnstat` for Internet traffic monitoring:

``` 
$ vnstat

                      rx      /      tx      /     total    /   estimated
 wlp60s0:
       Apr '18     20.83 GiB  /    1.55 GiB  /   22.38 GiB
       May '18      4.33 GiB  /    5.34 MiB  /    4.34 GiB  /   11.36 GiB
     yesterday    404.97 MiB  /     509 KiB  /  405.47 MiB
         today    593.05 MiB  /     773 KiB  /  593.80 MiB  /      --    

 enp59s0:
       Apr '18    206.79 GiB  /   56.90 GiB  /  263.69 GiB
       May '18     63.19 GiB  /   13.34 GiB  /   76.53 GiB  /  200.60 GiB
     yesterday      6.73 GiB  /  817.44 MiB  /    7.53 GiB
         today      4.03 GiB  /  376.32 MiB  /    4.39 GiB  /    5.31 GiB
```

Today the WiFi (wlp60s0) has sent/received 593 MB and Ethernet (enp59s0) has sent/received 4.39 GB.

To setup `vnstat` see this Q&A: [How to track the total network data in a month]({% post_url /2016/2016-11-01-How-to-track-the-total-network-data-in-a-month %})

----------

You don't have to tell Ubuntu to use Ethernet over Wifi because it automatically uses the fastest connection. The exception being if your Ethernet is 100 Mbps and your WiFi is faster than 300 Mbps. In this case the WiFi would take precedence.

If your WiFi is faster than your Ethernet click the Up/Down arrow representing network connection in the Systray. From the drop down menu disable the WiFi link by clicking `disconnect` button. You can also disable the Ethernet link from the same drop down menu.
