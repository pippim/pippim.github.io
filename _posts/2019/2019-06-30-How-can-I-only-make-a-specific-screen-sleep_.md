---
layout:       post
title:        >
    How can I only make a specific screen sleep?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155080
type:         Answer
tags:         multiple-monitors suspend screen standby
created_date: 2019-06-30 21:53:13
edit_date:    
votes:        "0 "
favorites:    
views:        "1,982 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-30-How-can-I-only-make-a-specific-screen-sleep_.md
toc:          false
navigation:   false
clipboard:    false
---

From [How do I turn off the backlight but leave the LCD on?](https://unix.stackexchange.com/questions/137854/how-do-i-turn-off-the-backlight-but-leave-the-lcd-on):



``` bash
$ sudo -i
# Turn backlight off
echo 4 > /sys/class/backlight/intel_backlight/bl_power
# Turn backlight on
echo 0 > /sys/class/backlight/intel_backlight/bl_power
exit
$
```

I've just tried this and it works fine on my laptop.
