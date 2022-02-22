---
layout:       post
title:        >
    Set CPU temperature throttle threshold on Ubuntu/Thinkpad
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1144572
type:         Answer
tags:         power-management overheating fan temperature intel-cpu
created_date: 2019-05-19 18:29:21
edit_date:    
votes:        "2 "
favorites:    
views:        "15,547 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-19-Set-CPU-temperature-throttle-threshold-on-Ubuntu_Thinkpad.md
toc:          false
navigation:   false
clipboard:    false
---

There is a [bug report][1] filed against `thermald`:

> Erratic behavior of CPU frequency control under load  

People get the same errors you report:

``` 
Oct 14 22:30:59 p5520 kernel: [ 9481.033687] CPU3: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.033688] CPU7: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.033718] CPU1: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.033719] CPU5: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.033720] CPU0: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.033720] CPU4: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.033722] CPU6: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.033722] CPU2: Package temperature above threshold, cpu clock throttled (total events = 5845)
Oct 14 22:30:59 p5520 kernel: [ 9481.034709] CPU3: Package temperature/speed normal
Oct 14 22:30:59 p5520 kernel: [ 9481.034710] CPU0: Package temperature/speed normal
Oct 14 22:30:59 p5520 kernel: [ 9481.034711] CPU4: Package temperature/speed normal
Oct 14 22:30:59 p5520 kernel: [ 9481.034711] CPU7: Package temperature/speed normal
Oct 14 22:30:59 p5520 kernel: [ 9481.034738] CPU2: Package temperature/speed normal
Oct 14 22:30:59 p5520 kernel: [ 9481.034738] CPU6: Package temperature/speed normal
Oct 14 22:30:59 p5520 kernel: [ 9481.034739] CPU1: Package temperature/speed normal
Oct 14 22:30:59 p5520 kernel: [ 9481.034740] CPU5: Package temperature/speed normal
```

Comment #18 says to:

> try running thermald in a window from command line.  
>   
>     systemctl stop thermald  
>     #thermald --no-daemon --loglevel=info  
>   
> Then do what triggers this, and attach the output of the above  
> command.  

If you decide the bug report fits your situation you can subscribe to the email notifications.

----------


On my machine I can't duplicate the problem with `thermald` and `tlp` loaded. I opened five terminals and typed into each one:

``` 
while true ; do : ; done
```

All that happened is five cores are running at 100% and 3100 MHz. No throttling has occurred but it did make the two laptop fans run on low speed. Normally in Linux they are off (or at least I can't hear them). System temperature is 88 Celsius and keyboard is still responsive to type this answer. The living room does feel a bit warmer though...

  [1]: https://bugs.launchpad.net/ubuntu/+source/thermald/+bug/1797802
