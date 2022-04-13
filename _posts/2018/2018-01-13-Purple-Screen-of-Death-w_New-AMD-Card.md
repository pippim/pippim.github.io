---
layout:       post
title:        >
    Purple Screen of Death w/New AMD Card
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/995572
type:         Answer
tags:         17.10 radeon amd-graphics vulkan grub
created_date: 2018-01-13 18:16:51
edit_date:    
votes:        "3 "
favorites:    
views:        "1,177 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-01-13-Purple-Screen-of-Death-w_New-AMD-Card.md
toc:          false
navigation:   false
clipboard:    false
---

# AMDGPU-PRO driver doesn't support Ubuntu 17.10

From this [AMD tech support website][1] an employee named Matt says:

> We don't support Ubuntu 17 yet in the latest AMDGPU-Pro, use 16.04.03  
> and Kernel 4.10 and Xorg 1.19.  


# Install AMDGPU-PRO Linux driver under Ubuntu 16.04

From the [AMD website][2] instructions for installing under Ubuntu 16.04 are listed:

- Edit `/etc/default/grub` as root and modify GRUB_CMDLINE_LINUX_DEFAULT in order to add "amdgpu.vm_fragment_size=9" (without the quotes). The line may look something like this after the change:

``` 
`GRUB_CMDLINE_LINUX_DEFAULT="quiet splash amdgpu.vm_fragment_size=9"`
```
- Update grub and reboot as root:

``` 
`update-grub;reboot`
```

# Your card is verified as AMDGPU-PRO compatible

The AMDGPU-Pro Driver is compatible with the following AMD products.

### AMD Product Family Compatibility

``` 
Radeon™ RX Vega Series Graphics             AMD Radeon™ Pro WX-series
Radeon™ Vega Frontier Edition	            AMD FirePro™ W9100
Radeon™ RX 550/560/570/580 Series Graphics	AMD FirePro™ W8100
AMD Radeon™ RX 460/470/480 Graphics	        AMD FirePro™ W7100
AMD Radeon™ Pro Duo	                        AMD FirePro™ W5100
AMD Radeon™ R9 Fury/Fury X/Nano Graphics    AMD FirePro™ W4300
AMD Radeon™ R9 380/380X/390/390X Graphics	AMD FirePro™ W4100
AMD Radeon™ R9 285/290/290X Graphics        AMD FirePro™ W2100
AMD Radeon™ R7 240/250/250X/260/260X/350    AMD FirePro™ W600
AMD Radeon™ HD7700/7800/8500/8600           AMD FirePro™ S-Series
AMD Radeon™ R9 360 Graphics                 AMD Radeon™ Pro WX 9100
AMD Radeon™ R5 340
```

  [1]: https://community.amd.com/thread/221419
  [2]: http://support.amd.com/en-us/kb-articles/Pages/AMDGPU-PRO-Driver-for-Linux-Release-Notes.aspx
