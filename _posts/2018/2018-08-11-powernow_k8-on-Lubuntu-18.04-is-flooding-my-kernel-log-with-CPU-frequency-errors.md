---
layout:       post
title:        >
    powernow_k8 on Lubuntu 18.04 is flooding my kernel log with CPU frequency errors
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064477
type:         Answer
tags:         kernel lubuntu cpu amd-processor
created_date: 2018-08-11 18:01:37
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "503 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    false
---

`powernow-k8`, which used to be an external module, has been directly compiled into the kernel since 2010. To avoid the speed-stepping you can simply run the CPUs at full speed. From Stack Exchange answer: [Is there a way to disable Intel SpeedStep steppings on an Ubuntu Server using a command line application?][1]

Start by reading the current available settings for your system:

``` 
sudo cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors

```

this will return a list of available settings you can use to regulate each core of your CPU, if you can you should then set them to max performance by selecting the performance option. This will make your CPU cores run always at max frequency.

Knowing what options you have and if the performance option is available, you can then set each core to performance mode with the command:

``` 
sudo echo performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor

```

this will make cpu0 (first core) run all the time at max performance. Do it for all the logical cores in your CPU.

You can then check if the option was successfully changed with the command:

``` 
sudo cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor

```

this will check the current set option for cpu0 (first core). Check if the change was successful for all cores and if everything was set correctly you are good to go: Intel SpeedStep will be on but all your cores will be running at max frequency speed all the time.

**NOTE:** Although the question and answer references Intel SpeedStep the same should hold true with AMD's PowerNow technology.

----------

## Original post based on Arch Linux information

powernow_k8 has been deprecated since kernel `3.7`. You can blacklist it (https://askubuntu.com/questions/110341/how-to-blacklist-kernel-modules) using command:

``` 
sudo -H leafpad /etc/modprobe.d/blacklist.conf

```

and inserting these two lines:

``` 
# powernow-k8 deprecated since kernel 3.7
blacklist powernow-k8

```

Save the file and exit `gedit`

After reboot confirm module is no longer loaded using:

``` 
lsmod | grep powernow-k8

```

You can also read the link above for steps to temporarily blacklist a module.

NOTE your CPU will now be running at full frequency unless the replacement  module `acpi-cpufreq` is used.


  [1]: https://superuser.com/questions/454101/is-there-a-way-to-disable-intel-speedstep-steppings-on-an-ubuntu-server-using-a
