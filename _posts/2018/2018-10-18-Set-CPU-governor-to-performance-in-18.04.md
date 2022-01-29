---
layout:       post
title:        >
    Set CPU governor to performance in 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1084727
type:         Answer
tags:         cpu 18.04 governor
created_date: 2018-10-18 01:48:54
edit_date:    2020-08-09 15:24:54
votes:        "8 "
favorites:    
views:        "141,517 "
accepted:     
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-18-Set-CPU-governor-to-performance-in-18.04.md
toc:          false
navigation:   false
clipboard:    true
---

# Short Answer

<!-- Language-all: lang-bash -->

In `/etc/rc.local` put in these commands:

``` 
sleep 120
cpupower frequency-set --governor performance
```


----------


## 1 minute after boot automatic switch to Powersave

For whatever reasons my Skylake Intel CPU always starts up in Performance mode and then switches to Powersave mode at the 1 minute mark automatically.

If you set the mode to *Performance* on startup it will be overridden around the 1 minute **Up Time** mark to *Powersave* mode.

In the GIF below, the 3000+ MHz CPU speed at start up appears near the top. The up time appears near the bottom. When up time hits about 1 minute you see CPU MHz drop off. :

[![CPU goes powersave 1 minute 2.gif][1]][1]

----------

## Program to monitor exact second Powersave invoked

Create this script in `/usr/local/bin/watch-gov.sh`:

<!-- Language-all: lang-bash -->

{% include copyHeader.html %}
``` 
#! /bin/bash

# NAME: watch-gov.sh
# PATH: /usr/local/bin
# DESC: Set governnor to performance and watch for change
#       Ask Ubuntu question: https://askubuntu.com/questions/1021748/set-cpu-governor-to-performance-in-18-04/1084727#1084727
# CALL: called from `/etc/rc.local`
# DATE: Created Oct 18, 2018.

echo performance | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
last_gov=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor)
Uptime=$(uptime)
echo "watch-gov.sh: Set to performance at $Uptime " > /tmp/watch-gov.log

for ((i=0; i<300; i++)) ; do
    curr_gov=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor)
    if [ $last_gov != $curr_gov ] ; then
        last_gov=$curr_gov
        Uptime=$(uptime)
        echo "watch-gov.sh: Current governor: $last_gov Uptime: $Uptime" >> \
            /tmp/watch-gov.log
    fi
    sleep 1
done
```

Call the script in `/etc/rc.local` before the `exit 0` command (explained in detail below).

One minute after logging in look at the output:

``` 
$ cat /tmp/watch-gov.log
watch-gov.sh: Set to performance at  17:50:09 up 0 min,  0 users,  load average: 0.00, 0.00, 0.00 
watch-gov.sh: Current governor: powersave Uptime:  17:51:09 up 1 min,  1 user,  load average: 1.89, 0.62, 0.22
```

Confirmation from this [answer][2] states this 1 minute force to `powersave` governor is controlled by `/etc/init.d/ondemand`.

----------


## Sleep 120 seconds before setting Performance Mode

The simplest way to stay in Performance mode is to edit `/etc/rc.local` and insert these lines before the last line containing `exit 0`:

``` 
sleep 120 # Give CPU startup routines time to settle.
echo performance | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
```

Save the file and reboot.

If you insert the new lines after `exit 0` it will never be executed.

To setup `/etc/rc.local` in 18.04 see: [How to Enable `/etc/rc.local` with Systemd](https://www.linuxbabe.com/linux-server/how-to-enable-etcrc-local-with-systemd)

----------

## Caveats

Your machine will probably run 10 to 15 degrees C hotter.

You may need to remove other programs that change CPU frequency if they override your Performance settings in `/etc/rc.local`


  [1]: https://i.stack.imgur.com/uAgQJ.gif
  [2]: https://askubuntu.com/a/614390/307523
