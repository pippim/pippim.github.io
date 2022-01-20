---
layout:       post
title:        >
    software to switch from AC to battery
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1183902
type:         Answer
tags:         power-management
created_date: 2019-10-26 01:57:15
edit_date:    2019-10-26 02:38:49
votes:        "3 "
favorites:    
views:        "250 "
accepted:     Accepted
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-10-26-software-to-switch-from-AC-to-battery.md
toc:          false
navigation:   false
clipboard:    false
---

This is suitable for people that like to let their laptop batteries discharge automatically and then recharge at a certain percentage. 

# Hardware component (20 bucks)

First you need an TP-Link HS100 compatible smart plug like [this one][1]:

[![tp-link hs-100 smart plug.png][2]][2]


----------

# Software component (Free)

Then you need some free Linux software like [tp-link Wi-Fi Smart Plug HS100][3]:

Switch plug on:

``` 
hs100.sh on
```

Switch plug off:

``` 
hs100.sh on
```

Check if plug is on or off:

``` 
hs100.sh check
```

Print plug system status:

``` 
hs100.sh status
```

[Blog about developing hs100.sh including full bash script][4]


  [1]: https://www.amazon.ca/TP-Link-Required-Anywhere-Assistant-HS105/dp/B01K1JVZOE/ref=pd_sbs_60_t_1/138-0748005-2681152?_encoding=UTF8&pd_rd_i=B01K1JVZOE&pd_rd_r=c0911e01-b46e-47fb-84d2-1d6a3a798cac&pd_rd_w=V03Ee&pd_rd_wg=h3RiF&pf_rd_p=9926bb69-42b9-46e4-b788-f665992e326d&pf_rd_r=RAHJ6ASEZ9930ZHQ79HC&psc=1&refRID=RAHJ6ASEZ9930ZHQ79HC
  [2]: https://i.stack.imgur.com/kVeyk.png
  [3]: https://github.com/branning/hs100
  [4]: https://blog.georgovassilis.com/2016/05/07/controlling-the-tp-link-hs100-wi-fi-smart-plug/
