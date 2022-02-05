---
layout:       post
title:        >
    Sleep & Wakeup Schedule | Ubuntu 16.04.3 LTS
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1012051
type:         Answer
tags:         suspend cron rtc
created_date: 2018-03-05 11:50:48
edit_date:    2020-06-12 14:37:07
votes:        "3 "
favorites:    
views:        "12,149 "
accepted:     
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-05-Sleep-_-Wakeup-Schedule-_-Ubuntu-16.04.3-LTS.md
toc:          false
navigation:   false
clipboard:    false
---

The script you are following is overly complicated. A simpler method is described [here][1].

Before a full implementation of 1am sleep and 6am wake, you can do a simple 10 second test:

``` 
sudo rtcwake -m mem -s 10 && firefox
```

This test will ensure suspending to RAM actually works. Upon resuming `firefox` is automatically started up.

Rather than messing around with UTC, have your `rtcwake` command called from `cron` at 1am and wake up `18000` seconds later. Your cron table entry would look something like this:

``` 
0 1 * * *  sh /usr/sbin/rtcwake -m mem -s 18000 >> /home/Me/SuspendResume.log 2>&1
```

There is no need for `sudo` prefix because `cron` runs with sudo privileges.

Replace `Me` with your user name. Check the file `SuspendResume.log` for cron messages periodically and whenever there is a problem. `2>&1` option redirects error messages to the `.log` file.

# Caveats

 -   RTC stands for real-time clock. rtcwake uses your computer’s hardware clock, which you can set in your BIOS, to determine when your computer will wake up. If you’re using an old computer with a dying CMOS battery that can’t keep the clock running properly, this won’t work.
 -   If sleep, suspend to RAM, or hibernate don’t work properly with your Linux system – perhaps because Linux doesn’t have the drivers to make them work properly with your hardware – this may not work.
 -   Be careful when setting a laptop to automatically wake at a specific time. You wouldn’t want it waking up, running, and overheating or running down its battery in a laptop bag.



  [1]: https://www.howtogeek.com/121241/how-to-make-your-linux-pc-wake-from-sleep-automatically/
