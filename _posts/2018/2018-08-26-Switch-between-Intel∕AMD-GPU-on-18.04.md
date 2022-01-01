---
layout:       post
title:        >
    Switch between Intel∕AMD GPU on 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1069136
type:         Answer
tags:         drivers graphics amd-graphics gpu-drivers
created_date: !!str "2018-08-26 16:16:33"
edit_date:    !!str ""
votes:        !!str "7"
favorites:    
views:        !!str "55,927"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

You can find many answers to your question here in **Ask Ubuntu**:

- June 2018 - https://askubuntu.com/questions/1038271/intel-amd-hybrid-graphics-ubuntu-18-04
- August 2018 - https://askubuntu.com/questions/1068343/switch-between-intel-amd-gpu-on-18-04
- June 2016 - https://askubuntu.com/questions/791249/amd-intel-hybrid-graphics-on-ubuntu-16-04

You should review all of these links.

Additionally you will find many helpful links from other sources:

- [Ubuntu Community AMDGPU-Driver][1]
- [Ubuntu Wiki Hybrid Graphics][2] This introduces you to `switcheroo` which may be the most common method of switching graphics
- [Arch Linux PRIME documentation][3]

All the links are too long to summarize in this answer.


----------

Rather than using `lspci -nn | grep VGA` which will only show your Intel GPU and not your AMD GPU you should try an expanded search using something like this:

``` 
$ lspci -k | grep -EA3 'VGA|Display|3D'
00:02.0 VGA compatible controller: Intel Corporation Skylake Integrated Graphics (rev 06)
	DeviceName:  Onboard IGD
	Subsystem: Dell Skylake Integrated Graphics
	Kernel driver in use: i915
--
01:00.0 3D controller: NVIDIA Corporation GM204M [GeForce GTX 970M] (rev a1)
	Subsystem: Dell GM204M [GeForce GTX 970M]
	Kernel driver in use: nvidia
	Kernel modules: nvidiafb, nouveau, nvidia_384_drm, nvidia_384

```

  [1]: https://help.ubuntu.com/community/AMDGPU-Driver
  [2]: https://help.ubuntu.com/community/HybridGraphics
  [3]: https://wiki.archlinux.org/index.php/PRIME
