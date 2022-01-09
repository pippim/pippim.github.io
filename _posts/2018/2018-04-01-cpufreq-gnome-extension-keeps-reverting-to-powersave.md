---
layout:       post
title:        >
    cpufreq gnome extension keeps reverting to powersave
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021174
type:         Answer
tags:         gnome 17.10 cpufreq conky
created_date: 2018-04-01 23:20:08
edit_date:    2018-04-02 00:43:57
votes:        "1 "
favorites:    
views:        "959 "
accepted:     Accepted
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

In your `/etc/init.d/cpufrequtils` file change:

``` 
GOVERNOR="ondemand"

```

to:

``` 
GOVERNOR="performance"

```

Leave the rest of the line as is. Save and reboot.

----------

TL;DR - old answer below

As far as Intel speed governors go:

- **ondemand** mode was deprecated years ago. 
- **performance** mode has little improvement over **powersave** mode.

That said your processor may not even support picking between `performance` and `powersave`.

To view available speed governors use this command:

``` 
$ cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors 
performance powersave

```

If you do have more than one governor you can check what is currently in use with this command:

``` 
$ cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
powersave

```

To change your processor to **performance** mode use:

``` 
$ echo performance | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
performance

```

You will then notice CPU% utilization drop by about 5% but also notice speed will increase from about 1000 MHz to 3000 MHz and temperatures will spike by ~10 degree, depending on your processor:

[![CPU Performance mode.gif][1]][1]


----------

I have noticed that even when set to **powersave** mode (as I always use) when Ubuntu first boots it runs in **performance** mode for 90 seconds before it eventually kicks into **powersave** mode.

None-the-less after manually setting the governor to performance mode using the appropriate command above. It has stayed in performance mode for 10 minutes now as confirmed by using the appropriate command above and doubly confirmed by conky display above.


----------

I left the governor set on `performance` for 30 minutes and it worked just fine. It might interest some readers what the conky display looks like when switching off of **performance** governor back to the default **powersave** governor:

[![CPU powersave.gif][2]][2]

CPU% utilization has spiked by 5%, but CPU frequency has dropped by 1500 MHz and temperature has decreased by about 10 degrees. Overall I think **powersave** mode is the best for most configurations.

  [1]: https://i.stack.imgur.com/imYi5.gif
  [2]: https://i.stack.imgur.com/q5cuK.gif
