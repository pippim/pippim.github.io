---
layout:       post
title:        >
    Using syslog to diagnose a crash
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1190229
type:         Answer
tags:         kernel crash syslog grub
created_date: 2019-11-20 04:32:51
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "314 "
accepted:     Accepted
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

Your error message is found in this [bug report][1].

>     i2c_designware 808622C1:06: punit semaphore timed out, resetting  
>     i2c_designware 808622C1:06: PUNIT SEM: 2  
>     i2c_designware 808622C1:06: couldn't acquire bus ownership  
>     axp288_fuel_gauge axp288_fuel_gauge: axp288 reg read err:-110  
>     axp288_fuel_gauge axp288_fuel_gauge: PWR STAT read failed:-110  
>     usb 1-2: reset high-speed USB device number 2 using xhci_hcd  
>     usb 1-2: reset high-speed USB device number 2 using xhci_hcd  
>     usb 1-2: reset high-speed USB device number 2 using xhci_hcd  
>     i2c_designware 808622C1:06: punit semaphore timed out, resetting  
>     i2c_designware 808622C1:06: PUNIT SEM: 0  
>     i2c_designware 808622C1:06: couldn't acquire bus ownership  
>     axp288_fuel_gauge axp288_fuel_gauge: IIO channel read error: fffffffb, 0  
>     power_supply axp288_fuel_gauge: driver failed to report `voltage_now' property: -5  
>     ***SYSTEM FREEZE***  

The title of the bug report is:

- ### [v2,4/5] i2c: designware-baytrail: Force the CPU to C1 state while holding the punit semaphore 

The workaroud leads us to this infamous thread in Linux-Land / Ubuntu-Utopia:

- [System freezes completely with Intel Bay Trail](System freezes completely with Intel Bay Trail)

Your best bet is to update grub command line (`sudo -H gedit /etc/default/grub`) with:

``` 
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash intel_idle.max_cstate=1"

```

and then run:

``` 
sudo update-grub

```


  [1]: https://patchwork.ozlabs.org/patch/708773/
