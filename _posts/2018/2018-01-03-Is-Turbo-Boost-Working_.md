---
layout:       post
title:        >
    Is Turbo Boost Working?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/991839
type:         Answer
tags:         intel turbo-boost conky
created_date: 2018-01-03 11:50:16
edit_date:    2018-02-10 20:37:51
votes:        "11 "
favorites:    
views:        "70,756 "
accepted:     
uploaded:     2022-02-10 05:38:36
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-03-Is-Turbo-Boost-Working_.md
toc:          false
navigation:   false
clipboard:    false
---

# Accepted top voted answer doesn't always work

As the second top voted answer pointed out, the top voted and accepted answer sometimes shows the maximum regular frequency.

# Alternate CLI methods

Below you can see frequencies for CPU Number 0. To see all CPU's replace `0` with `*`. The frequency is expressed in MHz with three decimal places. So `1000000` = 1000 MHz = 1 GHz. This Intel Skylake processor is rated to 2.6 GHz or 3.5 GHz with Turbo Boost enabled.

## Minimum frequency 800 MHz

``` 
$ cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_min_freq
800000
```

## Maximum frequency 3500 MHz (3.5 GHz)

``` 
$ cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_max_freq
3500000
```

## Current frequency 1027.669 MHz (1.028 GHz)

``` 
$ cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq
1027669
```

## CPU 0 to 7 Frequency when YouTube loads up

``` 
$ cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
2754249
2700098
2842167
2700270
1359287
901937
1662780
1731062
```

4 out of 8 processors are in turbo mode (above 2.6 GHz)

## CPU 0 to 7 Frequency when YouTube paused

``` 
$ cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
808913
800029
800022
800004
800001
800001
800013
800009
```

All processors are at minimum speed of 800 MHz even though Chrome is running on two screens with 11 tabs open but YouTube paused.

## Is Intel Turbo Boost enabled?

Using the terminal you can check if Turbo Boost feature is enabled:

``` 
$ cat /sys/devices/system/cpu/intel_pstate/no_turbo
0
```

This is a double negative; when "no turbo" is off (=0) then Turbo Boost is on.

To disable Turbo Boost use `sudo` powers and set the switch `no_turbo` to `1`:

``` 
$ echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
1
```

The returned `1` indicates turbo is now off.

----------


# Alternate GUI method using Conky

Other answers mention alternate methods to the basic CLI (Command Line Interface). I like to use [Conky][1] to do this. In the example below the Skylake CPU has a regular frequency from 800 MHz to 2600 Mhz. With turbo boost enabled the frequency can jump to 3500 MHz under heavy load. 

The .gif sample below starts out by showing frequency fluctuating around 3100 MHz under heavy load when `grep` is running on the whole file system. Then the command is issued:

``` 
$ echo "1" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
```

...to shut off turbo boost. Speed drops to fixed speed of 2600 MHz which is the regular maximum speed without turbo.

Then the turbo command is reversed:

``` 
$ echo "0" | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
```

...to turn turbo back on and speed jumps above 2600 MHz and fluctuates around 3100 to 3200 MHz again.

[![Toggle turbo boost][2]][2]

***Notice how quickly temperature jumps 10 degrees when Turbo is turned on***

  [1]: https://ubuntuforums.org/showthread.php?t=281865
  [2]: https://i.stack.imgur.com/eE0oo.gif
