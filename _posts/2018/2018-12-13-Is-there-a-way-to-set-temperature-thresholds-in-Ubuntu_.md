---
layout:       post
title:        >
    Is there a way to set temperature thresholds in Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1100506
type:         Answer
tags:         overheating temperature
created_date: 2018-12-13 02:44:40
edit_date:    
votes:        "1 "
favorites:    
views:        "91 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-13-Is-there-a-way-to-set-temperature-thresholds-in-Ubuntu_.md
toc:          false
navigation:   false
clipboard:    false
---

You shouldn't put your laptop on your lap. Your clothing can block the intact vents. You should put your laptop on a cooling pad:

[![cooling pad.png][1]][1]

The cooling pad in turn you can put on your lap or your couch, coffee table, bed, etc.

The fans on laptops are controlled by the manufacturer and kick in at given temperatures. To prevent your laptop from turning off when it gets too hot you can use **Intel Powerclamp**. Additionally you should be using `thermald` and `tlp`.

See: [Stop cpu from overheating]({% post_url /2017/2017-01-25-Stop-cpu-from-overheating %})

  [1]: https://i.stack.imgur.com/kQVkQ.jpg
