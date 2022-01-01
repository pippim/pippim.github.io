---
layout:       post
title:        >
    System unresponsive if left unattended for a few days
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/817663
type:         Answer
tags:         14.04 grub
created_date: 2016-08-28 04:03:16
edit_date:    2019-09-08 15:51:53
votes:        "5 "
favorites:    
views:        "221 "
accepted:     
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    false
---

Usually a system locks up when we do something. It's not often it locks up when we do nothing. On new Intel Bay Trail CPU's with Kernel version < 4.7.2 there are reports of freezing unless "intel_idle.max_cstate=1" is on the grub command line.

Your first choices after reboot are to look at dmesg. Then look at /var/log/kern.log (go to the end and scroll up). Then look at /var/log/syslog (also starting at end). Hopefully error messages are listed indicating what is leading up to the freeze up. Some users have a /var/log/messages file that can be viewed but it doesn't exist on my system (Ubuntu 16.04 / Kernel 4.7.2).

Because you are doing nothing for 3 or 4 days yet the system crashes on it's own my inclination is it's running out of memory (RAM + SWAP). To confirm this you will have to check on it once a day and type:

``` 
free -t

```

in the terminal. If my hunch is right each day you will see less and less available memory until the third or fourth day when there is none left. If my hunch is wrong there are no warranties on the crystal ball and you are back at square one digging though message files.

What applications are running on your system whilst unattended for 3 or 4 days? A poorly written application can allocate RAM for working storage and then forget to give it back to the Operating System later.
