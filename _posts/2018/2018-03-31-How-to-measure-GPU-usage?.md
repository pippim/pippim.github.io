---
layout:       post
title:        >
    How to measure GPU usage?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1020887
type:         Answer
tags:         software-recommendation gpu conky
created_date: !!str "2018-03-31 17:44:58"
edit_date:    !!str "2019-07-08 10:35:06"
votes:        !!str "15"
favorites:    
views:        !!str "394,109"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

# Conky

I like to use `conky` as a real-time monitor for both CPU and GPU. Installation is straightforward:

``` 
sudo apt install conky

```

## Intel i7-6700HQ iGPU HD 530

In this instance I've booted using the integrated GPU rather than the nVidia GTX 970M:

[![Intel GPU.gif][1]][1]

The `conky` code adapts depending on if booted with `prime-select intel` or `prime-select nvidia`:

## nVidia GPU GTX 970M

In this instance I've booted using the nVidia GTX 970M rather than the integrated GPU:

[![nVidia GPU.GIF][2]][2]

----------

## Conky code

The conky code was recently modified to auto-sense the GPU. Now it doesn't have to be hand modified when rebooting to a different GPU:

``` 
#------------+
# Intel iGPU |
#------------+
${color orange}${hr 1}${if_existing /sys/class/drm/card0/gt_cur_freq_mhz}
${color2}${voffset 5}Intel® Skylake GT2 HD 530 iGPU @${alignr}${color green}
${execpi .001 (cat /sys/class/drm/card0/gt_cur_freq_mhz)} MHz
${color}${goto 13}Min. Freq:${goto 120}${color green}${execpi .001 (cat /sys/class/drm/card0/gt_min_freq_mhz)} MHz${color}${goto 210}Max. Freq:${alignr}${color green}${execpi .001 (cat /sys/class/drm/card0/gt_max_freq_mhz)} MHz
${color orange}${hr 1}${else}
#------------+
# Nvidia GPU |
#------------+
#${color orange}${hr 1}${if_match "${lsmod | grep nvidia_uvm}">""}
${color2}${voffset 5}${execpi .001 (nvidia-smi --query-gpu=gpu_name --format=csv,noheader)} ${color1}@ ${color green}${execpi .001 (nvidia-smi --query-gpu=clocks.sm --format=csv,noheader)} ${alignr}${color1}Temp: ${color green}${execpi .001 (nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader)}°C
${color1}${voffset 5}Ver: ${color green}${execpi .001 (nvidia-smi --query-gpu=driver_version --format=csv,noheader)} ${color1} P-State: ${color green}${execpi .001 (nvidia-smi --query-gpu=pstate --format=csv,noheader)} ${alignr}${color1}BIOS: ${color green}${execpi .001 (nvidia-smi --query-gpu=vbios_version --format=csv,noheader)}
${color1}${voffset 5}GPU:${color green}${execpi .001 (nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader)} ${color1}Ram:${color green}${execpi .001 (nvidia-smi --query-gpu=utilization.memory --format=csv,noheader)} ${color1}Pwr:${color green}${execpi .001 (nvidia-smi --query-gpu=power.draw --format=csv,noheader)} ${alignr}${color1}Freq: ${color green}${execpi .001 (nvidia-smi --query-gpu=clocks.mem --format=csv,noheader)}
${color orange}${hr 1}${endif}

```

Different versions of the full code listing can be found in these answers:

- https://askubuntu.com/questions/941701/conky-transparent/941705#941705
- https://askubuntu.com/questions/604720/setting-to-high-performance/1047763#1047763

  [1]: https://i.stack.imgur.com/ZyTJ7.gif
  [2]: https://i.stack.imgur.com/Vhi8T.gif
