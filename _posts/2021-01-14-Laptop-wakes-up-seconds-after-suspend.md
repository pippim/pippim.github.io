---
layout:       post
title:        Laptop wakes up seconds after suspend
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1307811
type:         Answer
tags:         suspend wakeup standby
created_date: 2021-01-14 00:24:34
edit_date:    
votes:        1
favorites:    
views:        953
accepted:     Accepted
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    false
---

I had a similar problem which I reported in an [on-going bug report][1]

For me the solution was in this answer:

- https://askubuntu.com/questions/823318/how-to-turn-off-the-usb-power-to-my-mouse-when-i-suspend-the-notebook/836725?

I'm still using that old answer today, however I'm using the second script in the answer: `/lib/systemd/system-sleep/custom-xhci_hcd`.

Every now and then I turn the script off but something unusual happens and I have to turn the script back on. I can't fully explain why there are problems in suspend/resume so when I find something that works I just stick to it.


  [1]: https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1774994
