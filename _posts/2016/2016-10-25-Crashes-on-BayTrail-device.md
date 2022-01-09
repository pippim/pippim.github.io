---
layout:       post
title:        >
    Crashes on BayTrail device
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/841467
type:         Answer
tags:         hybrid integrated
created_date: 2016-10-25 02:32:51
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "313 "
accepted:     Accepted
uploaded:     2022-01-09 05:38:31
toc:          false
navigation:   false
clipboard:    false
---

I read the link Zanna provided in comments but there is something else you should look at: [Bay Trail Freezing][1]. There are over 500 messages here from Bay Trail users (plus a few other Intel CPUs).

The messages start in December 2015 so scroll down 3rd from the end (as of October 24, 2016) and you will see this post:

``` 
Justin 2016-10-22 21:58:34 UTC
One week so far no crashes.  4.8.0-rc8-amd64

Options

GRUB_CMDLINE_LINUX_DEFAULT=intel_idle.max_cstate=5

In rc.local this script is run at boot...

 ----- 

#!/bin/bash
echo 1 > /sys/devices/system/cpu/cpu0/cpuidle/state3/disable
echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo


thanks

```

I've read hundreds of these posts and some users can report "success" one day and the report back with "failed again!" a few days later. Above the author recommends Kernel version 4.8.0-rc8 but I would recommend using stable kernel version 4.8.4 instead. A summary for doing this is:

``` 
cd /tmp
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.4/linux-headers-4.8.4-040804_4.8.4-040804.201610220733_all.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.4/linux-headers-4.8.4-040804-generic_4.8.4-040804.201610220733_amd64.deb
wget http://kernel.ubuntu.com/~kernel-ppa/mainline/v4.8.4/linux-image-4.8.4-040804-generic_4.8.4-040804.201610220733_amd64.deb
sudo dpkg -i *.deb
sudo reboot

```

**Note:** Version 4.8.4 is the most current *stable kernel* as of October 24, 2016.

# October 30, 2016 update

From today's **bug mail** the following solution was proposed:

``` 
thorsten: Try the commands below, and report back. These eliminate hang ups on
my N2930 with kernel 4.7 (Gentoo).

First start kernel with: intel_idle.max_cstate=0

Then give these commands as root:

echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo
echo 1 > /sys/devices/system/cpu/cpu0/cpuidle/state3/disable
echo 1 > /sys/devices/system/cpu/cpu1/cpuidle/state3/disable
echo 1 > /sys/devices/system/cpu/cpu2/cpuidle/state3/disable
echo 1 > /sys/devices/system/cpu/cpu3/cpuidle/state3/disable

```

  [1]: https://bugzilla.kernel.org/show_bug.cgi?id=109051
