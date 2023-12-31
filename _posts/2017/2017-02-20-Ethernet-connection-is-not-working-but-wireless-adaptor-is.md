---
layout:       post
title:        >
    Ethernet connection is not working but wireless adaptor is
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/885211
type:         Answer
tags:         networking drivers network-manager internet ethernet
created_date: 2017-02-20 03:11:52
edit_date:    2017-04-13 12:23:51
votes:        "1 "
favorites:    
views:        "1,473 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-02-20-Ethernet-connection-is-not-working-but-wireless-adaptor-is.md
toc:          false
navigation:   false
clipboard:    false
---

Windows can disable the Ethernet adapter when it shuts down as answered in this Q&A: ([Ubuntu (dual boot Windows) Ethernet Not Connecting/Detecting][1]). If this is the case then (under Windows XP) follow these steps:

``` 
Right click my computer and choose "Properties"
--> "Hardware" tab   --> Device Manager
 --> Network Adapters
  --> "double click" Realtek ...
   --> Advanced tab
    --> Wake-On-Lan After Shutdown
     --> Enable
```

Sorry I don't have Windows 7 handy to list the detailed steps for it but you should be able to figure them out with the steps listed above and a little google if necessary.


  [1]: {% post_url /2017/2017-02-04-Ubuntu-_dual-boot-Windows_-Ethernet-Not-Connecting_Detecting %}
