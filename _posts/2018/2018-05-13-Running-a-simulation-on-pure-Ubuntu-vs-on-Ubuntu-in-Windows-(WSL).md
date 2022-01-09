---
layout:       post
title:        >
    Running a simulation on pure Ubuntu vs on Ubuntu in Windows (WSL)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035571
type:         Answer
tags:         windows windows-subsystem-for-linux benchmarks
created_date: 2018-05-13 04:02:33
edit_date:    2020-06-12 14:37:07
votes:        "12 "
favorites:    
views:        "10,589 "
accepted:     
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   false
clipboard:    true
---

Ubuntu in Windows (WSL - 2017 Fall Creators Update) is definitely slower than "Pure" Ubuntu in Linux environment.

For example screen painting takes many times longer in Windows 10 versus Ubuntu 16.04, ie you can actually see the cursor move in Windows 10:

[![WSL bash startup.gif][3]][3]

It takes about 5 seconds for the WSL Bash splash screen to paint. By comparison it is about 1 1/2 seconds for the same splash screen in Ubuntu 16.04:

[![Ubuntu terminal splash.gif][4]][4]


----------

## CPU Benchmarking

The first section shows how slow screen I/O is but what about CPU benchmarking?

From this Ask Ubuntu Q&A: [CPU benchmarking utility for Linux](CPU benchmarking utility for Linux), I ran tests on Ubuntu 16.04 on Linux and Windows. On Linux about 24 seconds on Windows 10 version 1709 about 31 seconds. Linux is 6 seconds faster or about 25% faster. However I just upgraded Windows 10 to version 1803 (Redstone 4 aka Spring Creators April 2018 update) and it took 24 seconds which is the same as Linux.

### Ubuntu 16.04 on Linux

{% include copyHeader.html %}
``` 
$ sysbench --test=cpu --cpu-max-prime=20000 run
sysbench 0.4.12:  multi-threaded system evaluation benchmark

Running the test with following options:
Number of threads: 1

Doing CPU performance benchmark

Threads started!
Done.

Maximum prime number checked in CPU test: 20000


Test execution summary:
    total time:                          23.5065s
    total number of events:              10000
    total time taken by event execution: 23.5049
    per-request statistics:
         min:                                  2.13ms
         avg:                                  2.35ms
         max:                                  8.52ms
         approx.  95 percentile:               2.76ms

Threads fairness:
    events (avg/stddev):           10000.0000/0.00
    execution time (avg/stddev):   23.5049/0.00

```

### Ubuntu 16.04 on Windows 10 build 1709

{% include copyHeader.html %}
``` 
$ sysbench --test=cpu --cpu-max-prime=20000 run
sysbench 0.4.12:  multi-threaded system evaluation benchmark

Running the test with following options:
Number of threads: 1

Doing CPU performance benchmark

Threads started!
Done.

Maximum prime number checked in CPU test: 20000


Test execution summary:
    total time:                          30.5350s
    total number of events:              10000
    total time taken by event execution: 30.5231
    per-request statistics:
         min:                                  2.37ms
         avg:                                  3.05ms
         max:                                  6.21ms
         approx.  95 percentile:               4.01ms

Threads fairness:
    events (avg/stddev):           10000.0000/0.00
    execution time (avg/stddev):   30.5231/0.00

```


### Ubuntu 16.04 on Windows 10 build 1803

{% include copyHeader.html %}
``` 
$ sysbench --test=cpu --cpu-max-prime=20000 run
sysbench 0.4.12:  multi-threaded system evaluation benchmark

Running the test with following options:
Number of threads: 1

Doing CPU performance benchmark

Threads started!
Done.

Maximum prime number checked in CPU test: 20000


Test execution summary:
    total time:                          23.7223s
    total number of events:              10000
    total time taken by event execution: 23.7155
    per-request statistics:
         min:                                  2.21ms
         avg:                                  2.37ms
         max:                                  4.53ms
         approx.  95 percentile:               2.73ms

Threads fairness:
    events (avg/stddev):           10000.0000/0.00
    execution time (avg/stddev):   23.7155/0.00
## 
```




**NOTE:** Windows 10 spring update for 2018 (dubbed **Redstone 4**) came out on May 9th (4 days ago) and I will be installing it soon to check out the improvements. No doubt there are many. One I know of that interests me is the ability to run `cron` jobs on startup. I need that for automatic daily backups to gmail.com.

**NOTE 2:** I've just installed Windows 10 Build 1803 (April 2018 Spring Creators Update AKA Redstone 4) and the screen painting is much much faster. It's now only 3 seconds instead of 5 seconds to display the Bash splash screen. The CPU benchmark is on par with Linux now.

  [3]: https://i.stack.imgur.com/09Ycq.gif
  [4]: https://i.stack.imgur.com/pH9F1.gif


