---
layout:       post
title:        >
    Is using the shutdown command to turn off the system safe?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1192164
type:         Answer
tags:         command-line power-management shutdown
created_date: 2019-11-28 03:19:53
edit_date:    
votes:        "2 "
favorites:    
views:        "7,457 "
accepted:     
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-28-Is-using-the-shutdown-command-to-turn-off-the-system-safe_.md
toc:          false
navigation:   false
clipboard:    false
---

## YES it is safe but...

Shutdown does more than simply flush unwritten data from RAM to disk. In some installations it can be setup to run custom jobs:

- [Execute a script upon logout/reboot/shutdown in Ubuntu](Execute a script upon logout/reboot/shutdown in Ubuntu)

But as an answer here points out:

- [Difference between shutdown options](Difference between shutdown options)

The shutdown `halt` option (designated by `shutdown -h` in your question) does flush all the buffers and safely unmount the disks but it doesn't actually turn off the machine. To do that use:

``` 
poweroff
```

> `halt` means flush buffers, unmount drives, close all processes in a  
> graceful way. But not power off (though some systems may power off  
> anyway). So the hardware is still provided with power.  
>   
> After halt a hard power off (pressing the power button or unplugging  
> the power supply) will not damage the system, because it is already  
> halted in a graceful way.  
