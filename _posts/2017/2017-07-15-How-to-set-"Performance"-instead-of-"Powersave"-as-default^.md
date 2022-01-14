---
layout:       post
title:        >
    How to set "Performance" instead of "Powersave" as default?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/936488
type:         Answer
tags:         17.04 cpufreq
created_date: 2017-07-15 17:54:43
edit_date:    2020-08-09 15:24:45
votes:        "31 "
favorites:    
views:        "51,185 "
accepted:     
uploaded:     2022-01-14 05:39:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-15-How-to-set-"Performance"-instead-of-"Powersave"-as-default^.md
toc:          false
navigation:   false
clipboard:    false
---

# Performance and Powersave Governor Policies

There are various options for setting CPU governor policy described in Ask Ubuntu and other websites:

 - [How to permanently set CPU power management to the powersave governor?][1]
 - [Prevent your laptop from overheating][2]
 - [How I can disable CPU frequency scaling and set the system to performance?][3]
 - [CPU Frequency scaling in Linux][4]
 - [Avoiding CPU Speed Scaling – Running CPU At Full Speed][5]

Keep in mind most websites suggest leaving CPU governing at `Powersave`. I'm on a laptop and found using Intel's ThermalD and P-State technologies coupled with TLP power management has best result for frequencies, fan speed and temperature.

# Summarizing above links

To summarize achieving your goal from the above answers use:

Install cpufrequtils:

``` 
sudo apt-get install cpufrequtils

```

Then edit the following file (if it doesn't exist, create it):

``` 
sudo nano /etc/default/cpufrequtils

```

And add the following line to it:

``` 
GOVERNOR="performance"

```

Save and exit.

For changes take effect, run:

``` 
sudo systemctl restart cpufrequtils

```

Then you can run `cpufreq-info` to see informations about your cpu frequency, governor and more:

``` 
$ cpufreq-info
    current policy: frequency should be within 800 MHz and 3.90 GHz.
              The governor "performance" may decide which speed to use
              within this range.

```


----------

As per this Q&A: [Set CPU governor to performance in 18.04](https://askubuntu.com/a/1084727/307523)

If you want performance governor all the time you need to edit `/etc/rc.local` and insert these lines before the last line containing `exit 0`:

``` 
sleep 120 # Give CPU startup routines time to settle.
cpupower frequency-set --governor performance

```

To setup `/etc/rc.local` in 18.04 see: [How to Enable `/etc/rc.local` with Systemd](https://www.linuxbabe.com/linux-server/how-to-enable-etcrc-local-with-systemd)


  [1]: https://askubuntu.com/questions/410860/how-to-permanently-set-cpu-power-management-to-the-powersave-governor
  [2]: http://www.webupd8.org/2014/04/prevent-your-laptop-from-overheating.html
  [3]: https://askubuntu.com/questions/523640/how-i-can-disable-cpu-frequency-scaling-and-set-the-system-to-performance
  [4]: https://idebian.wordpress.com/2008/06/22/cpu-frequency-scaling-in-linux/
  [5]: http://www.servernoobs.com/avoiding-cpu-speed-scaling-in-modern-linux-distributions-running-cpu-at-full-speed-tips/
  [6]: https://blog.sleeplessbeastie.eu/2015/11/09/how-to-set-cpu-governor-at-boot/
