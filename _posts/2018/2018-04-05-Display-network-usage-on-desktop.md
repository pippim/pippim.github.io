---
layout:       post
title:        >
    Display network usage on desktop
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1022384
type:         Answer
tags:         gnome 17.10 widgets conky vnstat
created_date: 2018-04-05 22:28:47
edit_date:    
votes:        "0 "
favorites:    
views:        "634 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-05-Display-network-usage-on-desktop.md
toc:          false
navigation:   false
clipboard:    false
---

Here is my `conky` display. Note network stats in bottom section:

[![Peek.gif][1]][1]

Here is the `conky` code used:

``` 
TEXT
#------------+
# Distro     |
#------------+
${color}Today is:${color green}$alignr${time %A,}$alignr ${time %e %B %G}
${color}Distribution:${color green}$alignr ${pre_exec cat /etc/issue.net} $machine
${color}Kernel:$alignr${color green} $kernel
${color orange}${voffset 2}${hr 1}
#------------+
# i7-6700 CPU|
#------------+
${color2}${voffset 5}Intel® i-7 6700HQ 3.5 GHz: ${color1}@  ${color green}${freq} MHz
${color}${goto 13}CPU 0 ${goto 81}${color green}${cpu cpu1}% ${goto 131}${color3}${cpubar cpu1 18}
${color}${goto 13}CPU 1 ${goto 81}${color green}${cpu cpu2}% ${goto 131}${color3}${cpubar cpu2 18}
${color}${goto 13}CPU 2 ${goto 81}${color green}${cpu cpu3}% ${goto 131}${color3}${cpubar cpu3 18}
${color}${goto 13}CPU 3 ${goto 81}${color green}${cpu cpu4}% ${goto 131}${color3}${cpubar cpu4 18}
${color}${goto 13}CPU 4 ${goto 81}${color green}${cpu cpu5}% ${goto 131}${color3}${cpubar cpu5 18}
${color}${goto 13}CPU 5 ${goto 81}${color green}${cpu cpu6}% ${goto 131}${color3}${cpubar cpu6 18}
${color}${goto 13}CPU 6 ${goto 81}${color green}${cpu cpu7}% ${goto 131}${color3}${cpubar cpu7 18}
${color}${goto 13}CPU 7 ${goto 81}${color green}${cpu cpu8}% ${goto 131}${color3}${cpubar cpu8 18}
${color1}All CPU ${color green}${cpu}% ${goto 131}${color1}Temp: ${color green}${hwmon 1 temp 1}°C ${goto 250}${color1}Up: ${color green}$uptime
${color green}$running_processes ${color1}running of ${color green}$processes ${color1}loaded processes.
${color}Load Avg. 1-5-15 minutes: ${alignr}${color green}${execpi .001 (awk '{printf "%s/", $1}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $2}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $3}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4}
#------------+
# Nvidia GPU |
#------------+
${color orange}${hr 1}${if_existing /tmp/nvidia}
${color2}${voffset 5}${execpi .001 (nvidia-smi --query-gpu=gpu_name --format=csv,noheader)} ${color}@ ${color green}${execpi .001 (nvidia-smi --query-gpu=clocks.sm --format=csv,noheader)} ${alignr}${color}Temp: ${color green}${execpi .001 (nvidia-smi --query-gpu=temperature.gpu --format=csv,noheader)} C
${color}${voffset 5}Ver: ${color green}${execpi .001 (nvidia-smi --query-gpu=driver_version --format=csv,noheader)} ${color} P-State: ${color green}${execpi .001 (nvidia-smi --query-gpu=pstate --format=csv,noheader)} ${alignr}${color}BIOS: ${color green}${execpi .001 (nvidia-smi --query-gpu=vbios_version --format=csv,noheader)}
${color}${voffset 5}GPU:${color green}${execpi .001 (nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader)} ${color}Ram:${color green}${execpi .001 (nvidia-smi --query-gpu=utilization.memory --format=csv,noheader)} ${color}Pwr:${color green}${execpi .001 (nvidia-smi --query-gpu=power.draw --format=csv,noheader)} ${alignr}${color}Freq: ${color green}${execpi .001 (nvidia-smi --query-gpu=clocks.mem --format=csv,noheader)}
#------------+
# Intel iGPU |
#------------+
${else}
${color2}${voffset 5}Intel® Skylake GT2 HD 530 iGPU @  ${color green}${execpi .001 (cat /sys/class/drm/card0/gt_cur_freq_mhz)} MHz
${color}${goto 13}Min. Freq:${goto 120}${color green}${execpi .001 (cat /sys/class/drm/card0/gt_min_freq_mhz)} MHz${color}${goto 210}Max. Freq:${alignr}${color green}${execpi .001 (cat /sys/class/drm/card0/gt_max_freq_mhz)} MHz
${color orange}${hr 1}
#------------+
# Prcoesses  |
#------------+
${color1}${voffset 5}Process Name: ${goto 215}PID ${goto 265}CPU% ${goto 337}Mem%
${color}${goto 13}${top name 1} ${goto 210}${top pid 1} ${goto 275}${color green}${top cpu 1} ${goto 350}${top mem 1}
${color}${goto 13}${top name 2} ${goto 210}${top pid 2} ${goto 275}${color green}${top cpu 2} ${goto 350}${top mem 2}
${color}${goto 13}${top name 3} ${goto 210}${top pid 3} ${goto 275}${color green}${top cpu 3} ${goto 350}${top mem 3}
${color}${goto 13}${top name 4} ${goto 210}${top pid 4} ${goto 275}${color green}${top cpu 4} ${goto 350}${top mem 4}
${color}${goto 13}${top name 5} ${goto 210}${top pid 5} ${goto 275}${color green}${top cpu 5} ${goto 350}${top mem 5}
${color}${goto 13}${top name 6} ${goto 210}${top pid 6} ${goto 275}${color green}${top cpu 6} ${goto 350}${top mem 6}
${color}${goto 13}${top name 7} ${goto 210}${top pid 7} ${goto 275}${color green}${top cpu 7} ${goto 350}${top mem 7}
${color}${goto 13}${top name 8} ${goto 210}${top pid 8} ${goto 275}${color green}${top cpu 8} ${goto 350}${top mem 8}
${color}${goto 13}${top name 9} ${goto 210}${top pid 9} ${goto 275}${color green}${top cpu 9} ${goto 350}${top mem 9}
${color orange}${voffset 2}${hr 1}
#------------+
# Storage    |
#------------+
${color}Memory:${goto 148}${color green}$mem / $memmax $alignr${color green}${memperc /}%
${color}Linux:${goto 148}${color green}${fs_used /} / ${fs_size /} $alignr${color green}${fs_used_perc /}%
${color}NVMe Win 10:${goto 148}${if_mounted /mnt/c}${color green} ${fs_used /mnt/c} / ${fs_size /mnt/c} $alignr${color green}${fs_used_perc /mnt/c}%${else}${color yellow}/mnt/c${endif}
${color}${if_mounted /mnt/d}HGST_Win10:${goto 148}${color green} ${fs_used /mnt/d} / ${fs_size /mnt/d} $alignr${color green}${fs_used_perc /mnt/d}%${else}Cache RAM:${goto 148}${color green}${cached} ${color} Buffers: ${color green} ${buffers}${endif}
${color}${if_mounted /mnt/e}WSL+Linux:${goto 148}${color green}${fs_used /mnt/e} / ${fs_size /mnt/e} $alignr${color green}${fs_used_perc /mnt/e}%${else}Swap:${goto 148}${color green}${swap} / ${swapmax} $alignr${color green}${swapperc}%${endif}
${color orange}${voffset 2}${hr 1}
#------------+
# Network    |
#------------+
${color1}Network using vnStat "-i", "-w" and "-m"
${color}${goto 5}Today ${goto 100}Yesterday ${goto 225}Week ${goto 325}Month ${color green}
${execi 10 vnstat -i enp59s0 | grep "today" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 110}${execi 10 vnstat -i enp59s0 | grep "yesterday" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 220}${execi 10 vnstat -i enp59s0 -w | grep "current week" | awk '{print $9" "substr ($10, 1, 1)}'} ${goto 315}${execi 10 vnstat -i enp59s0 -m | grep "`date +"%b '%y"`" | awk '{print $9" "substr ($10, 1, 1)}'}
${color}Down: ${color green}${downspeed enp59s0}/s ${color}${goto 220}Up: ${color green}${upspeed enp59s0}/s
${downspeedgraph enp59s0 25,190 000000 ff0000} ${alignr}${upspeedgraph enp59s0 25,190 000000 00ff00}$color
Total: ${color green}${totaldown enp59s0} $color${alignr}Total: ${color green}${totalup enp59s0}
${color orange}${voffset 2}${hr 1}
#------------+
# Brightness |
#------------+
${color}${goto 5}Dawn: ${color green}${execpi 300 cat /usr/local/bin/sunrise} ${goto 155}${color}Dusk: ${color green}${execpi 300 cat /usr/local/bin/sunset} ${alignr}${color}Level: ${color green}${execpi 10 cat /sys/class/backlight/intel_backlight/brightness}
${color orange}${voffset 2}${hr 1}
```

  [1]: https://i.stack.imgur.com/hizqf.gif
