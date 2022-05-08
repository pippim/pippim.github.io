---
layout:       post
title:        >
    how to save CPU logs or GPU usage values?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/923938
type:         Answer
tags:         cpu cpu-load top htop
created_date: 2017-06-10 02:22:48
edit_date:    2017-06-14 01:22:11
votes:        "2 "
favorites:    
views:        "5,784 "
accepted:     Accepted
uploaded:     2022-05-08 09:37:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-06-10-how-to-save-CPU-logs-or-GPU-usage-values_.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# First decide which CPU stats you want to log

You can choose different statistics to log:

 - CPU speed (frequency in Mhz or Ghz)
 - CPU utilization percentage
 - CPU temperature
 - CPU average load factor
 - Further these stats can be segmented for each CPU, ie #1 to #8 for
   quad-core hyper-threaded CPU.

For simplicity sake, I'll base this answer using average load factor similar to the answer in: [How to log CPU load?][1]


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# Create a loop for two hours logging every second

You'll need a bash script to loop 7,200 seconds (2 hours) which would look like this:



``` bash
#!/bin/bash

for ((i=0; i<7200; i++))
do
    uptime >> /home/user/cpuload.log
    sleep 1
done
```


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

# Parse the data in a spreadsheet

To look at your output use the command:

``` bash
$ cat cpuload.log
 20:04:06 up 2 days, 14 min,  1 user,  load average: 1.39, 1.12, 0.95
```

The load average is reporting three variables--last minute, last five minutes and last fifteen minutes. For simplicity sake only consider the last minute load average which is reported every second in our loop.

You can import the file `cpuload.log` into a spreadsheet and graph the data points over the two hours or simply scroll over the data.
I use Libre Office Calc but all modern spreadsheets can import the file.


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

# Brief points about load average

In the example above the one minute load average is `1.39`. This appears dangerously high because anything over `.70` deserves investigation and `1.00` means there is a bottle-neck and processes aren't being served and have to wait.

However in your spreadsheet you'll have to divide the load average by the number of CPUs you have. To quickly find this out use the command:

``` bash
$ cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq
2074968
2133093
2094750
1863843
1728562
1855875
1849125
1778156
```

This shows there are 8 CPUs (it's a quad-core hyper-threaded Intel i-7 3630QM laptop CPU running 1200 Mhz to 3400 Mhz). In this snapshot CPU#1 (called CPU0 internally) is running at `2,0749.68 Mhz` and CPU#8 is running at `1,7781.56 Mhz`. But I digress, the important thing is to count how many CPUs there are which is 8.

So divide the load average `1.39` by 8 and the TRUE load average is `0.17` which is very respectable. Once again any value over `0.70` deserves investigation and when it hits `1.00` your system is stalling. You can read further [here][2]


----------


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr6">Skip</a></div>

# Using `top` command to see top 10 processes

To use the `top` command to see the 10 most resource intensive processes use this command instead of the `uptime` command:

``` bash
top -n 1 -b | head -n 17 | tail -n 10 >> /home/user/top10.log
```

The file `/home/user/top10.log` will look something like this (repeated every second for two hours):

``` bash
$ top -n 1 -b | head -n 17 | tail -n 10
 6170 rick      20   0 1437432 537000 126060 S  62.5  6.7   8:50.24 chrome
 2466 rick      20   0 1210040 140568  61864 S   6.2  1.8  22:16.88 compiz
 4111 rick      20   0  742396 248724 185820 S   6.2  3.1  36:26.68 chrome
 6280 rick      20   0   41800   3668   3124 R   6.2  0.0   0:00.01 top
10096 root      20   0       0      0      0 S   6.2  0.0   0:00.47 kworker/0:2
    1 root      20   0  120064   6244   4000 S   0.0  0.1   0:02.23 systemd
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.05 kthreadd
    3 root      20   0       0      0      0 S   0.0  0.0   0:01.31 ksoftirqd/0
    5 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kworker/0:+
    7 root      20   0       0      0      0 S   0.0  0.0   1:39.28 rcu_sched
```

**NOTE:** replace `user` with your actual user name.


----------


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>

# Using `top` command to get **us**, **sy**, **id** and **si** CPU values

Similar to the first section, create a bash script to loop 7,200 seconds:



``` bash
#!/bin/bash

# NAME: ~/bin/cpu-top-summary
# DATE: June 13, 2017
# DESC: Call `top` command every second to obtain CPU(s) stats for
#       us, sy, ni, id, wa, hi, si, and st. Log to /tmp/top-cpu-summary.log
#       with time stamp in hh:mm:ss 24 hour format.
# PARM: $1 number of seconds to run, ie 2 hours = 7200

now="$(date +'%d/%m/%Y')"
printf "top CPU(s) summary for %s\n" "$now" > /tmp/top-cpu-summary.log
for ((i=0; i<$1; i++))
do
    TimeStamp=`date +"%H:%M:%S"`
    printf "$TimeStamp - " >> /tmp/top-cpu-summary.log
    top -n 1 -b | head -n 3 | tail -n 1 >> /tmp/top-cpu-summary.log
    sleep 1
done
```

When you call the bash script using `top-cpu-summary 10` you can see the output for 10 seconds using:

``` bash
$ cat /tmp/top*
top CPU(s) summary for 13/06/2017
19:17:34 - %Cpu(s): 25.0 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:35 - %Cpu(s): 25.0 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:36 - %Cpu(s): 25.0 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:37 - %Cpu(s): 25.0 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:38 - %Cpu(s): 25.0 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:39 - %Cpu(s): 25.0 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:41 - %Cpu(s): 25.0 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:42 - %Cpu(s): 24.9 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:43 - %Cpu(s): 24.9 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
19:17:44 - %Cpu(s): 24.9 us,  9.2 sy,  0.0 ni, 65.4 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st
```



  [1]: https://askubuntu.com/questions/22021/how-to-log-cpu-load
  [2]: http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages



<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a></div>

