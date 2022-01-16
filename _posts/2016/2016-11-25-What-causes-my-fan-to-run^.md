---
layout:       post
title:        >
    What causes my fan to run?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/853314
type:         Answer
tags:         16.04 fan temperature conky
created_date: 2016-11-25 01:02:12
edit_date:    
votes:        "2 "
favorites:    
views:        "2,646 "
accepted:     Accepted
uploaded:     2022-01-16 15:34:09
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-25-What-causes-my-fan-to-run^.md
toc:          false
navigation:   false
clipboard:    false
---

Basically the harder your CPU works, the hotter it gets and the faster the fan spins. Older Ubuntu versions had different techniques for speed of your fan based on the speed of your CPU. With upgrade from Ubuntu 14.04 LTS to  Ubuntu 16.04 LTS, kernel 4.4 was used and Intel changed many things most notably `pstate` and `thermald`. Plus (on my Intel i-7 Core at least) turbo boost was finally implemented after a very very long waiting period. These changes also brought with it many challenges.

To see how hot your system is running, use:

``` 
$ cat /sys/class/thermal/thermal_zone*/temp

27800
29800
60000
```

On my system the last temperature is that of the CPU 60 degrees Celsius. The first two temperatures I honestly can't say what they are but I presume ambient temperatures somewhere on the motherboard. Keep in mind this is a laptop.

The fan can not be heard and you have to hold your hand over the exhaust vent to feel the warm air coming out.

When your fan(s) pick up speed you can run the program `htop` to see what is running and how much CPU% they are eating up. Another program of interest is `sensors` which shows temperatures and fan speeds. Many people are familiar with these two programs and use them when the need arises.

I use a light weight system monitor called Conky that runs all the time to display CPU%, temperature, available disk space, network usage, etc. Most people don't use Conky but those that do all have different setups. This is what my configuration looks like:

[![Conky 4.8.10 Full Window][1]][1]

I'm finding under the newest kernel version 4.8.10 the system is running the coolest with the lowest CPU strain. To install this version use:

``` 
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-headers-4.8.10-040810_4.8.10-040810.201611210531_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-headers-4.8.10-040810-generic_4.8.10-040810.201611210531_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.10/linux-image-4.8.10-040810-generic_4.8.10-040810.201611210531_amd64.deb
sudo dpkg -i *.deb
sudo reboot
```

**NOTE:** Manually installing the newest kernel requires extra steps to manually remove it in the future when it is no longer needed. Also note the newest kernel is not supported by Ubuntu and crash reports will be ignored by them. The fact the newest kernel comes from Ubuntu should not give you a false sense of security.

  [1]: https://i.stack.imgur.com/QNkDx.png
