---
layout:       post
title:        >
    How to remove the GobiNet and GobiSerial driver from ubuntu 16.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1203691
type:         Answer
tags:         drivers
created_date: 2020-01-17 12:47:23
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "457 "
accepted:     Accepted
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    false
---


## Removing drivers

To remove drivers from memory use:

``` 
modprobe -vr GobiSerial
modprobe -vr GobiNet

```

To prevent drivers from loading in the first place see blacklisting:

- [https://askubuntu.com/questions/110341/how-to-blacklist-kernel-modules](https://askubuntu.com/questions/110341/how-to-blacklist-kernel-modules)

## Gobiserial specific

If your desire is to fix bad drivers then as per this [website][1] you must install firmware updates via Windows, not Linux:

> ### FIRMWARE UPDATE: (Incase you need one)   
> The firmware update has to be done on windows. Insert the device into a windows box, and let it  
> install drivers and enumerate interafaces. Make sure you can see the  
> managment webpage.  

Note the three typos in the original instructions, it's a bad omen....

  [1]: https://www.orbit-lab.org/wiki/Software/hDrivers
