---
layout:       post
title:        >
    Install NDiSWrapper in Ubuntu 20.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1311377
type:         Answer
tags:         drivers 20.04 software-installation ndiswrapper
created_date: !!str "2021-01-27 11:34:13"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "2,236"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

You don't need to download from sourceforge.net. You can simply use:

``` 
sudo apt update
sudo apt install ndiswrapper-common ndiswrapper-utils-1.9

```

You can read full instructions [here][1].


  [1]: https://www.cyberciti.biz/faq/linux-ndiswrapper-wpa_supplicant-howto/
