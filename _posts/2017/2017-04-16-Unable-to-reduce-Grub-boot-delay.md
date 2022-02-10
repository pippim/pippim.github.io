---
layout:       post
title:        >
    Unable to reduce Grub boot delay
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/905477
type:         Answer
tags:         grub2
created_date: 2017-04-16 14:44:45
edit_date:    2017-04-20 22:30:38
votes:        "2 "
favorites:    
views:        "2,223 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-04-16-Unable-to-reduce-Grub-boot-delay.md
toc:          false
navigation:   false
clipboard:    false
---

## Grub ignores a timeout of zero and sets to 10 seconds

In your `/etc/default/grub` you are passing the value "0". Grub ignores timeouts of zero and resets the value to 10 instead. To "trick" Grub pass the value 0.0 which when tested by Grub is not equal to 0.

## Setting timeout to zero

In my `/etc/default/grub` I have these relevant lines setup:

``` 
#GRUB_DEFAULT=0 # Rather than option #1, we'll always default to last boot choice.
GRUB_DEFAULT=saved
GRUB_SAVEDEFAULT=true
GRUB_HIDDEN_TIMEOUT=0.0
GRUB_HIDDEN_TIMEOUT_QUIET=true
GRUB_TIMEOUT=0.0
```

I've used the values `0.0` without double quotes to reflect how numeric values are used.

Notice the first line is commented out. This means grub no longer defaults to the first menu option (in my case Kernel 4.9.21) but rather the last option booted with (in my case Kernel 4.4.0-72-generic from the **Advanced Options Menu**)

The second and third lines ensure you always boot to the same option last chosen.

## Changing the boot option when no menu appears

A better method is to reduce timeout and provide option to force your menu to appear. This method is described here: [How can I get my GRUB menu to be hidden, AND have the shift or esc keys show the hidden GRUB menu at boot time][1]


  [1]: https://askubuntu.com/questions/879881/how-can-i-get-my-grub-menu-to-be-hidden-and-have-the-shift-or-esc-keys-show-the/882268?noredirect=1#comment1424271_882268
