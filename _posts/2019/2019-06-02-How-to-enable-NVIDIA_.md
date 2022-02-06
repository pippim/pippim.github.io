---
layout:       post
title:        >
    How to enable NVIDIA?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1148161
type:         Answer
tags:         nvidia graphics 19.04
created_date: 2019-06-02 22:46:33
edit_date:    2019-06-03 10:32:14
votes:        "3 "
favorites:    
views:        "15,174 "
accepted:     Accepted
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-06-02-How-to-enable-NVIDIA_.md
toc:          false
navigation:   false
clipboard:    true
---

## June 3, 2019 Update

Nvidia needs a working Xorg installation to operate within. As your current Xorg Gnome desktop is broken you can try the [Unity Desktop][1] to get nVidia drivers working first. 

``` 
sudo apt-get install unity-session
sudo apt-get install lightdm 
```

- And using TAB key select lightdm between "gdm3" and "lightdm" choices there, and press ENTER key to go.

----------


I have a GTX 970M but I know this driver also works with the GTX 1060M which is one step above yours:

{% include copyHeader.html %}
``` 
$ sudo ubuntu-drivers devices

== /sys/devices/pci0000:00/0000:00:01.0/0000:01:00.0 ==
model    : GM204M [GeForce GTX 970M]
vendor   : NVIDIA Corporation
modalias : pci:v000010DEd000013D8sv00001028sd00000708bc03sc02i00
driver   : nvidia-384 - distro non-free recommended
driver   : xserver-xorg-video-nouveau - distro free builtin

$ dmesg | grep -i nvidia

[    1.760813] nvidia: loading out-of-tree module taints kernel.
[    1.760817] nvidia: module license 'NVIDIA' taints kernel.
[    1.763857] nvidia: module verification failed: signature and/or required key missing - tainting kernel
[    1.771538] nvidia-nvlink: Nvlink Core is being initialized, major device number 242
[    1.771720] nvidia 0000:01:00.0: enabling device (0006 -> 0007)
[    1.771858] NVRM: loading NVIDIA UNIX x86_64 Kernel Module  384.130  Wed Mar 21 03:37:26 PDT 2018 (using threaded interrupts)
[    1.778086] nvidia-modeset: Loading NVIDIA Kernel Mode Setting Driver for UNIX platforms  384.130  Wed Mar 21 02:59:49 PDT 2018
[    1.779773] [drm] [nvidia-drm] [GPU ID 0x00000100] Loading driver
[    1.779774] [drm] Initialized nvidia-drm 0.0.0 20160202 for 0000:01:00.0 on minor 1
[    4.866848] nvidia-uvm: Loaded the UVM driver in 8 mode, major device number 240
[    5.248695] input: HDA NVidia HDMI/DP,pcm=3 as /devices/pci0000:00/0000:00:01.0/0000:01:00.1/sound/card1/input9
[    8.877159] nvidia-modeset: Allocated GPU:0 (GPU-30fab9bc-fe6f-ec05-e8e6-c151a1a96121) @ PCI:0000:01:00.0
```

If you need sound turned on for your nVidia HDMI and most manufacturers these days have it powered off, then you need to use this:

- [Linux kernel module to toggle Nvidia HDMI audio device on/off on notebooks][2]

Here is someone that has taken the `prime-select` code and patched it because it wouldn't switch from `nvidia` to `intel`. If his patch doesn't help you perhaps he can?

- [NVIDIA-PRIME: Cant switch to intel](NVIDIA-PRIME: Cant switch to intel)


  [1]: http://www.ubuntubuzz.com/2019/05/unity-desktop-on-ubuntu-1904.html
  [2]: https://github.com/hhfeuer/nvhda
