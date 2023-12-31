---
layout:       post
title:        >
    NVIDIA: GPU exception occured durint X server init
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1155259
type:         Answer
tags:         drivers nvidia xorg
created_date: 2019-07-01 17:06:51
edit_date:    
votes:        "0 "
favorites:    
views:        "748 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-01-NVIDIA_-GPU-exception-occured-durint-X-server-init.md
toc:          false
navigation:   false
clipboard:    false
---

Here's what my `dmesg` looks like:

``` 
$ dmesg | grep -i nvidia
[    1.517472] nvidia: loading out-of-tree module taints kernel.
[    1.517477] nvidia: module license 'NVIDIA' taints kernel.
[    1.520410] nvidia: module verification failed: signature and/or required key missing - tainting kernel
[    1.524609] nvidia-nvlink: Nvlink Core is being initialized, major device number 242
[    1.524802] nvidia 0000:01:00.0: enabling device (0006 -> 0007)
[    1.524981] NVRM: loading NVIDIA UNIX x86_64 Kernel Module  384.130  Wed Mar 21 03:37:26 PDT 2018 (using threaded interrupts)
[    1.530574] nvidia-modeset: Loading NVIDIA Kernel Mode Setting Driver for UNIX platforms  384.130  Wed Mar 21 02:59:49 PDT 2018
[    1.531818] [drm] [nvidia-drm] [GPU ID 0x00000100] Loading driver
[    1.531820] [drm] Initialized nvidia-drm 0.0.0 20160202 for 0000:01:00.0 on minor 1
[    4.318800] nvidia-uvm: Loaded the UVM driver in 8 mode, major device number 240
[    4.864567] input: HDA NVidia HDMI/DP,pcm=3 as /devices/pci0000:00/0000:00:01.0/0000:01:00.1/sound/card1/input9
[    7.517965] nvidia-modeset: Allocated GPU:0 (GPU-30fab9bc-fe6f-ec05-e8e6-c151a1a96121) @ PCI:0000:01:00.0
```

Your `dmesg` has two extra lines:

``` 
[   16.317773] nvidia 0000:01:00.0: vgaarb: changed VGA decodes: olddecodes=io+mem,decodes=none:owns=none
[   16.504557] input: HDA NVidia HDMI/DP,pcm=7 as /devices/pci0000:00/0000:00:01.0/0000:01:00.1/sound/card1/input13
```

Your `dmesg` is missing a line:

``` 
[    7.517965] nvidia-modeset: Allocated GPU:0 (GPU-30fab9bc-fe6f-ec05-e8e6-c151a1a96121) @ PCI:0000:01:00.0
```

My system is a Skylake 6700HQ with nVidia GTX 970M so it's fairly close to yours. I've been using driver `384.130` with great success from day one and never changed it. I only had one quirk where Windows powers on sound to nVidia card but Linux does not. So I had to apply a patch called `nvhda` in order to get HDMI sound to my TV.
