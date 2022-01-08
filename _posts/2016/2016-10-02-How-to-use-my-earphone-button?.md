---
layout:       post
title:        >
    How to use my earphone button?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832326
type:         Answer
tags:         vlc
created_date: 2016-10-02 19:30:04
edit_date:    2017-02-25 15:45:30
votes:        "2 "
favorites:    
views:        "891 "
accepted:     Accepted
uploaded:     2022-01-07 19:24:26
toc:          false
navigation:   false
clipboard:    false
---

Your wired **earphone button** has 4 leads on the male plug which works ok on smartphones that have 4 receptors on the female jack. However most laptops only have 3 receptors on the female jack so the button can't operate.

If you have bluetooth earbuds this link ([Bluetooth headset multimedia buttons])[1] would help you out. Basically it says `/etc/modules-load.d/uinput.conf` needs to contain `uinput`.


  [1]: https://wiki.archlinux.org/index.php/Bluetooth_headset#Headset.27s_multimedia_buttons
