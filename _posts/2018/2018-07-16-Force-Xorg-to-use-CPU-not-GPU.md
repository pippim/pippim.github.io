---
layout:       post
title:        >
    Force Xorg to use CPU not GPU
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1056431
type:         Answer
tags:         unity nvidia xorg cpu gpu
created_date: 2018-07-16 01:33:58
edit_date:    2019-02-21 10:47:27
votes:        "3 "
favorites:    
views:        "11,180 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-16-Force-Xorg-to-use-CPU-not-GPU.md
toc:          false
navigation:   false
clipboard:    true
---

This answer: [Use integrated graphics for display and NVIDIA GPU for CUDA on Ubuntu 14.04][1] appears relevant for you.

In summary setting up `/etc/X11/xorg.conf` as follows:

{% include copyHeader.html %}
``` 
Section "ServerLayout"
    Identifier "layout"
    Screen 0 "intel"
    Screen 1 "nvidia"
EndSection

Section "Device"
    Identifier "intel"
    Driver "intel"
    BusID "PCI:0@0:2:0"
    Option "AccelMethod" "SNA"
EndSection

Section "Screen"
    Identifier "intel"
    Device "intel"
EndSection

Section "Device"
    Identifier "nvidia"
    Driver "nvidia"
    BusID "PCI:1@0:0:0"
    Option "ConstrainCursor" "off"
EndSection

Section "Screen"
    Identifier "nvidia"
    Device "nvidia"
    Option "AllowEmptyInitialConfiguration" "on"
    Option "IgnoreDisplayDevices" "CRT"
EndSection
```

 Read the entire [post][1] for more details.


----------

## Reply to comments

According [Asus Canada specs][2]:

> Integrated Graphics Processor- Intel® HD Graphics support Multi-VGA  
> output support : HDMI/DVI-D/RGB/DisplayPort ports  
> - Supports HDMI with max. resolution 4096 x 2160 @ 24 Hz / 2560 x 1600 @ 60 Hz  
> - Supports DVI-D with max. resolution 1920 x 1200 @ 60 Hz  
> - Supports RGB with max. resolution 1920 x 1200 @ 60 Hz  
> - Supports DisplayPort with max. resolution 4096 x 2304 @ 60 Hz Maximum shared memory of 512 MB Supports Intel® InTru™ 3D, Quick Sync  
> Video, Clear Video HD Technology, Insider™ Supports up to 3 displays  
> simultaneously DP 1.2 Multi-Stream Transport compliant, supports DP  
> 1.2 monitor daisy chain up to 3 displays  

I suggest temporarily taking out your two nVidia cards, plugging a monitor into the on-board HDMI port and booting with a Live USB to runs tests with Ubuntu.

It is important to know your CPU. Discover this using:

``` 
cat /proc/cpuinfo | grep 'model name'
```

and report back.

  [1]: https://gist.github.com/alexlee-gk/76a409f62a53883971a18a11af93241b
  [2]: https://www.asus.com/ca-en/Motherboards/Z170-A/specifications/
