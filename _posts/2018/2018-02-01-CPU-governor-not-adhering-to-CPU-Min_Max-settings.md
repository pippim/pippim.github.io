---
layout:       post
title:        >
    CPU governor not adhering to CPU Min/Max settings
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1001929
type:         Answer
tags:         performance cpu cpufreq cpuinfo conky
created_date: 2018-02-01 03:29:51
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "2,207 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-02-01-CPU-governor-not-adhering-to-CPU-Min_Max-settings.md
toc:          false
navigation:   false
clipboard:    false
---

# Install stress test to get maximum frequency

If you want to see your CPU running at full speed run a stress test. From this answer: [How do I stress test CPU and RAM (at the same time)?][1] you can install `stress` using:

``` 
sudo apt install stress
```

Then stress test your CPU and RAM using:

``` 
stress --cpu 8 --io 4 --vm 4 --vm-bytes 1024M --timeout 20s
```

Even when set to `powersave` instead of `performance` you can see by running `top` or in my case `conky` the CPUs max out at top turbo speed:

[![stress 30 seconds.gif][2]][2]

The display starts out for a few seconds running around 1100 MHz at 50 degrees Celsius watching a Dr. Who Video on one screen and four Firefox tabs open on the other screen.

Then the stress test engages and temperatures spike to 80 degrees Celsius with all four cores (8 virtual CPUs) running at 3100 MHz. From Intel's wikipage for the [i7 6700HQ][3]:

``` 
turbo frequency (1 core)    3,500 MHz (3.5 GHz, 3,500,000 kHz) +
turbo frequency (2 cores)   3,300 MHz (3.3 GHz, 3,300,000 kHz) +
turbo frequency (3 cores)   3,200 MHz (3.2 GHz, 3,200,000 kHz) +
turbo frequency (4 cores)   3,100 MHz (3.1 GHz, 3,100,000 kHz) +
```

Although published top speed is 3.5 GHz (3500 MHz) with turbo that is for a single core and we have all four cores running at max which is 3.1 GHz (3100 MHz).


  [1]: {% post_url /2017/2017-08-23-How-do-I-stress-test-CPU-and-RAM-_at-the-same-time__ %}
  [2]: https://i.stack.imgur.com/dtADq.gif
  [3]: https://en.wikichip.org/wiki/intel/core_i7/i7-6700hq
