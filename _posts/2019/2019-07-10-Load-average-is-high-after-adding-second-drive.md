---
layout:       post
title:        >
    Load average is high after adding second drive
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157252
type:         Answer
tags:         hard-drive ssd sata optical conky
created_date: 2019-07-10 10:59:53
edit_date:    2019-07-10 23:38:21
votes:        "4 "
favorites:    
views:        "1,093 "
accepted:     
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-10-Load-average-is-high-after-adding-second-drive.md
toc:          false
navigation:   false
clipboard:    false
---

There is an excellent Q&A with the same problem:

- [kworker consumes high cpu for external hard drive][1]

[![enter image description here][2]][2]

The solution from top-voted answer was this command:

``` 
echo "disable" > /sys/firmware/acpi/interrupts/gpe6F
```

In the link `grep` was used to discover the interrupt causing grief:

``` 
grep . -r /sys/firmware/acpi/interrupts/
```


----------

## Load Average

If you look at your system load average for 1-5-15 minutes like this:

``` 
$ cat /proc/loadavg
0.50 0.76 0.91 2/1037 14366
```

It's reporting .5, .76 and .91. From [Understanding Linux CPU Load - when should you be worried?](https://scoutapm.com/blog/understanding-load-averages) it says:

> - The **"Need to Look into it"** Rule of Thumb: 0.70 If your load average is staying above > 0.70, it's time to investigate before  
> things get worse.  

Further in the article it will mention something like the load average for all your CPUs are added together but not divided by the number of CPUs to get an average of all CPUs. You have to do this manually so the true values are:

.063 - .095 - .113

because I have 8 CPUs.

I prefer to use Conky to display this in real-time though:

[![conky nvidia.png][3]][3]

Notice the 4th line from the bottom display 1-5-15 minute load averages as:

``` 
.150 .177 .143
```

The 1 minute load average of .15 equates to 15% which matches the **All CPU** percentage value two lines above the **Load Average**.

Without diving by 8 I'd have a heart attack because I would be seeing:

``` 
1.200 1.416 1.144
```

Conky automatically divides for me with the Conky code:

``` 
${execpi .001 (awk '{printf "%s/", $1}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $2}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $3}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4}
```

Of course not everyone uses conky probably only 1% of Linux users but for those out there that love Conky like me, you might find this code helpful.

  [1]: https://unix.stackexchange.com/questions/398520/kworker-consumes-high-cpu-for-external-hard-drive
  [2]: https://i.stack.imgur.com/NsixPm.png
  [3]: https://i.stack.imgur.com/E8AWR.png
