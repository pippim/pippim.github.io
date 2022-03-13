---
layout:       post
title:        >
    Frequent switches between Ethernet and Wifi
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1394492
type:         Answer
tags:         networking network-manager ethernet
created_date: 2022-02-23 12:06:22
edit_date:    
votes:        "1 "
favorites:    
views:        "110 "
accepted:     Accepted
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2022/2022-02-23-Frequent-switches-between-Ethernet-and-Wifi.md
toc:          false
navigation:   false
clipboard:    true
---

I had a problem last year:

- [Suddenly Ethernet &amp; WiFi won&#39;t co-exist](Suddenly Ethernet &amp; WiFi won&#39;t co-exist)

The solution there could work for you:

---

A script that automatically disables WiFi when Ethernet (Network) is connected:

{% include copyHeader.html %}
``` bash
#!/bin/bash
export LC_ALL=C

enable_disable_wifi ()
{
    result=$(nmcli dev | grep "ethernet" | grep -w "connected")
    if [ -n "$result" ]; then
        nmcli radio wifi off
    else
        nmcli radio wifi on
    fi
}

if [ "$2" = "up" ]; then
    enable_disable_wifi
fi

if [ "$2" = "down" ]; then
    enable_disable_wifi
fi
```

The script has to be created in a specific directory. After creation mark it executable:

``` 
chmod a+x /etc/NetworkManager/dispatcher.d/70-wifi-wired-exclusive.sh
```
