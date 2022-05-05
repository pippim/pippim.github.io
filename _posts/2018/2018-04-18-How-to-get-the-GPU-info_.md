---
layout:       post
title:        >
    How to get the GPU info?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1026234
type:         Answer
tags:         command-line graphics gpu conky
created_date: 2018-04-18 23:05:59
edit_date:    2020-06-12 14:37:07
votes:        "8 "
favorites:    
views:        "1,353,549 "
accepted:     
uploaded:     2022-05-05 04:52:17
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-18-How-to-get-the-GPU-info_.md
toc:          false
navigation:   false
clipboard:    false
---

# Conky or Terminal Splash Screen

I use two methods to automatically display nVidia GPU and Intel iGPU information:

- Conky dynamically displays GPU information in real time
- `~/.bashrc` displays GPU information each time the terminal is opened

----------


## Conky real time display

This example uses Conky to display current GPU (nVidia or Intel) stats in real time. Conky is a light weight system monitor popular among many Linux enthusiasts.

The display changes depending on if you booted after `prime-select intel` or `prime-select nvidia`.

### Intel iGPU

[![gpu temp intel.gif][1]][1]

- The Intel iGPU shows as `Skylake GT2 HD 530 iGPU` with current frequency
- The Minimum frequency is `350` MHz and the Maximum is `1050` MHz

### nVidia GPU

[![gpu temp nvidia.gif][2]][2]

- The nVidia GPU shows as `GeForce GTX970M` with current GPU frequency and temperature
- The Driver version, P-State and BIOS version are displayed
- The GPU load, RAM use, Power Consumption and RAM frequency is displayed

### Conky Code

Here is the relevant Conky script for Intel iGPU and nVidia GPU:

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
## ```



### `~/.bashrc` Terminal splash screen

This example modifies `~/.bashrc` to display information on a splash screen each time the terminal is opened or whenever you type `. .bashrc` at the shell prompt.

In addition to `neofetch` answered previously, there is `screenfetch` which looks a lot nicer (IMO). Plus another answer mentions he doesn't know how to get iGPU listed and this does it:

[![ubuntu terminal splash.png][3]][3]

For details on setup see: [Terminal splash screen with Weather, Calendar, Time &amp; Sysinfo?][4]

In summary just for the bottom section with Ubuntu display containing GPU information (second last line) use:

``` 
sudo apt install screenfetch
screenfetch
```

You'll want to put the `screenfetch` command an the bottom of your `~/.bashrc` file to have it appear every time you open the terminal.


  [1]: https://i.stack.imgur.com/7eNp3.gif
  [2]: https://i.stack.imgur.com/MnBGg.gif
  [3]: https://i.stack.imgur.com/itFpX.png
  [4]: {% post_url /2018/2018-03-30-Terminal-splash-screen-with-Weather_-Calendar_-Time-_-Sysinfo_ %}
