---
layout:       post
title:        >
    How to check Intel iGPU frequency on Linux?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195406
type:         Answer
tags:         kernel intel-graphics conky
created_date: 2019-12-11 12:29:41
edit_date:    
votes:        "0 "
favorites:    
views:        "4,831 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-11-How-to-check-Intel-iGPU-frequency-on-Linux_.md
toc:          false
navigation:   false
clipboard:    false
---

Conky constantly updates iGPU speed for me:

[![intel gpu temp.gif][1]][1]

In this image I'm stressing GPU with graphics test and the conky displays results on desktop. Unfortunately `glxgears` barely stress iGPU which stays at minimum frequency.

The relevant `conky` code:

``` 
#------------+
# Intel iGPU |
#------------+
${color orange}${hr 1}${if_match "intel" == "${execpi 99999 prime-select query}"}
${color2}${voffset 5}Intel® Skylake GT2 HD 530 iGPU @${alignr}${color green}${execpi .001 (cat /sys/class/drm/card1/gt_cur_freq_mhz)} MHz
${color}${goto 13}Min. Freq:${goto 120}${color green}${execpi .001 (cat /sys/class/drm/card1/gt_min_freq_mhz)} MHz${color}${goto 210}Max. Freq:${alignr}${color green}${execpi .001 (cat /sys/class/drm/card1/gt_max_freq_mhz)} MHz
${color orange}${hr 1}${else}
#------------+
# Nvidia GPU |
#------------+
${color2}${voffset 5}${execpi .001 (nvidia-smi --query-gpu=gpu_name --format=csv,noheader)} ${color1}@ ${color green}${execpi .001 (nvidia-smi --query-gpu=clocks.sm --format=csv,noheader)} ${alignr}${color1}Temp: ${color green}${execpi .001 (nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader)}°C
${color1}${voffset 5}Ver: ${color green}${execpi .001 (nvidia-smi --query-gpu=driver_version --format=csv,noheader)} ${color1} P-State: ${color green}${execpi .001 (nvidia-smi --query-gpu=pstate --format=csv,noheader)} ${alignr}${color1}BIOS: ${color green}${execpi .001 (nvidia-smi --query-gpu=vbios_version --format=csv,noheader)}
${color1}${voffset 5}GPU:${color green}${execpi .001 (nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader)} ${color1}Ram:${color green}${execpi .001 (nvidia-smi --query-gpu=utilization.memory --format=csv,noheader)} ${color1}Pwr:${color green}${execpi .001 (nvidia-smi --query-gpu=power.draw --format=csv,noheader)} ${alignr}${color1}Freq: ${color green}${execpi .001 (nvidia-smi --query-gpu=clocks.mem --format=csv,noheader)}
${color orange}${hr 1}${endif}
```

To make a long story short:

``` 
cat /sys/class/drm/card*/gt_cur_freq_mhz
```

Will give you your current iGPU frequency.

  [1]: https://i.stack.imgur.com/A4xKw.gif
