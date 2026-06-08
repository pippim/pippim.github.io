---
layout:       post
title:        >
    High PCH chip temperature while idle on MSI laptop. What should I do?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1062628
type:         Answer
tags:         sound laptop overheating temperature
created_date: 2018-08-05 16:23:23
edit_date:    
votes:        "2 "
favorites:    
views:        "9,545 "
accepted:     
uploaded:     2026-06-08 06:28:40
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-05-High-PCH-chip-temperature-while-idle-on-MSI-laptop.-What-should-I-do_.md
toc:          false
navigation:   false
clipboard:    false
---

You can get the temperatures from the same place where `sensors` gets it without installing the package first. Use this one-liner:

``` 
$ paste <(cat /sys/class/thermal/thermal_zone*/type) <(cat /sys/class/thermal/thermal_zone*/temp) | column -s $'\t' -t
INT3400 Thermal  20000
SEN1             53000
SEN2             52000
SEN3             55000
SEN4             58000
B0D4             49000
pch_skylake      72500
x86_pkg_temp     50000
```

`pch_skylake` is the temperature sensor for the **Platform Controller Hub**. Here's what [Wikipedia][1] says about it:

> The PCH controls certain data paths and support functions used in  
> conjunction with Intel CPUs. These include clocking (the system  
> clock), Flexible Display Interface (FDI) and Direct Media Interface  
> (DMI), although FDI is only used when the chipset is required to  
> support a processor with integrated graphics. As such, I/O functions  
> are reassigned between this new central hub and the CPU compared to  
> the previous architecture: some northbridge functions, the memory  
> controller and PCI-e lanes, were integrated into the CPU while the PCH  
> took over the remaining functions in addition to the traditional roles  
> of the southbridge.  

And because *"a picture is worth a thousand words"*, here is a schematic:

............ [![PCH controller.png][2]][2]


<sub>**Image:** By Anas hashmi - Own work, Public Domain, [https://commons.wikimedia.org/w/index.php?curid=9817206</sub>](https://commons.wikimedia.org/w/index.php?curid=9817206</sub>)


  [1]: https://en.wikipedia.org/wiki/Platform_Controller_Hub
  [2]: https://pippim.github.io/assets/img/posts/2018/WYNz1.png
