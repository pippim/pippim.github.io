---
layout:       post
title:        >
    Why is it possible to take screenshot without root privileges?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1247614
type:         Answer
tags:         permissions screen screenshot
created_date: 2020-06-06 17:09:17
edit_date:    
votes:        "2 "
favorites:    
views:        "459 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

You could take the time to allow no one except **root** user to run the screenshot program. However other programs can still see the "screen", any "monitor" and any "window" opened.

For example my little python script "reads" the screen image, gathers monitor information and controls any window:

[![mmm screenshot.png][1]][1]

The same python script also pauses/plays movies on the left monitor, adjusts brightness and color temperature on any monitor and even controls a 120 VAC light behind a TV turning it off and on.

What you deem a disadvantage or "security hole" is actually an advantage or "freedom" for others. After all, we are talking about "personal computers". Even in business settings it is often necessary for a low-power user to take a screenshot. One example is taking a program's screenshot and sending it to corporate help desk for support.




  [1]: https://i.stack.imgur.com/TV4ON.jpg
