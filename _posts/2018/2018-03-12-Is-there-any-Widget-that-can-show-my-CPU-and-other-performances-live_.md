---
layout:       post
title:        >
    Is there any Widget that can show my CPU and other performances live?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1014284
type:         Answer
tags:         system-monitor cpuinfo conky vnstat
created_date: 2018-03-12 19:23:55
edit_date:    2020-06-12 14:37:07
votes:        "22 "
favorites:    
views:        "55,225 "
accepted:     
uploaded:     2022-02-11 06:08:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-03-12-Is-there-any-Widget-that-can-show-my-CPU-and-other-performances-live_.md
toc:          false
navigation:   false
clipboard:    true
---

# Conky

Conky is a popular light weight system monitor. I have it running on the right side of one of my monitors all the time:

[![Conky with video then close.gif][1]][1]

The GIF animation show 2 dozen seconds with youtube running and then closed. Then you'll notice a single core getting most of the activity for the screen recorder itself.

This is the `conky` code I used (minus the header section which can be desktop specific):

{% include copyHeader.html %}
``` 
TEXT
#------------+
# Distro     |
#------------+
${color}Today is:${color green}$alignr${time %A,}$alignr ${time %e %B %G}
${color}Distribution:${color green}$alignr ${execi 6300 cat /etc/issue.net} $machine
${color}Kernel:$alignr${color green} $kernel
${color orange}${voffset 2}${hr 1}
#------------+
# i7-6700 CPU|
#------------+
${color2}${voffset 5}Intel® i-7 6700HQ 3.5 GHz: ${color1}@  ${color green}${freq} MHz
${color}${goto 13}CPU 0 ${goto 81}${color green}${cpu cpu1}% ${goto 131}${color3}${cpubar cpu1 18}
#${cpugauge cpu1 20,40}
#${cpugraph 1 15,200 555555 AAAAAA -l}
${color}${goto 13}CPU 1 ${goto 81}${color green}${cpu cpu2}% ${goto 131}${color3}${cpubar cpu2 18}
${color}${goto 13}CPU 2 ${goto 81}${color green}${cpu cpu3}% ${goto 131}${color3}${cpubar cpu3 18}
${color}${goto 13}CPU 3 ${goto 81}${color green}${cpu cpu4}% ${goto 131}${color3}${cpubar cpu4 18}
${color}${goto 13}CPU 4 ${goto 81}${color green}${cpu cpu5}% ${goto 131}${color3}${cpubar cpu5 18}
${color}${goto 13}CPU 5 ${goto 81}${color green}${cpu cpu6}% ${goto 131}${color3}${cpubar cpu6 18}
${color}${goto 13}CPU 6 ${goto 81}${color green}${cpu cpu7}% ${goto 131}${color3}${cpubar cpu7 18}
${color}${goto 13}CPU 7 ${goto 81}${color green}${cpu cpu8}% ${goto 131}${color3}${cpubar cpu8 18}
#------------+
# Temperature|
#------------+
# Next line is for Skylake temperature when none of the other methods work.
#${color1}All CPUs ${color green}${cpu}% ${goto 131}${color1}Temp: ${color green}${execpi .001 cat /sys/class/thermal/thermal_zone7/temp | cut -c1-2}°C ${alignr}${color1}Up: ${color green}$uptime
# Next line is for kernel >= 4.13.0-36-generic
${color1}All CPUs ${color green}${cpu}% ${goto 131}${color1}Temp: ${color green}${hwmon 1 temp 1}°C ${alignr}${color1}Up: ${color green}$uptime
# Next line is for temperature with Kerenel 4.4
#${color1}All CPUs ${color green}${cpu}% ${goto 131}${color1}Temp: ${color green}${hwmon 0 temp 1}°C ${alignr}${color1}Up: ${color green}$uptime
${color green}$running_processes ${color1}running of ${color green}$processes ${color1}loaded processes.
${color1}Load Average 1-5-15 minutes: ${alignr}${color green}${execpi .001 (awk '{printf "%s/", $1}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $2}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4} ${execpi .001 (awk '{printf "%s/", $3}' /proc/loadavg; grep -c processor /proc/cpuinfo;) | bc -l | cut -c1-4}
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
#------------+
# Prcoesses  |
#------------+
${color1}${voffset 5}Process Name: ${goto 200}PID ${goto 265}CPU% ${alignr}Mem%
${color}${goto 13}${top name 1} ${goto 190}${top pid 1} ${goto 270}${color green}${top cpu 1} ${alignr}${top mem 1}
${color}${goto 13}${top name 2} ${goto 190}${top pid 2} ${goto 270}${color green}${top cpu 2} ${alignr}${top mem 2}
${color}${goto 13}${top name 3} ${goto 190}${top pid 3} ${goto 270}${color green}${top cpu 3} ${alignr}${top mem 3}
${color}${goto 13}${top name 4} ${goto 190}${top pid 4} ${goto 270}${color green}${top cpu 4} ${alignr}${top mem 4}
${color}${goto 13}${top name 5} ${goto 190}${top pid 5} ${goto 270}${color green}${top cpu 5} ${alignr}${top mem 5}
${color}${goto 13}${top name 6} ${goto 190}${top pid 6} ${goto 270}${color green}${top cpu 6} ${alignr}${top mem 6}
${color}${goto 13}${top name 7} ${goto 190}${top pid 7} ${goto 270}${color green}${top cpu 7} ${alignr}${top mem 7}
${color}${goto 13}${top name 8} ${goto 190}${top pid 8} ${goto 270}${color green}${top cpu 8} ${alignr}${top mem 8}
${color}${goto 13}${top name 9} ${goto 190}${top pid 9} ${goto 270}${color green}${top cpu 9} ${alignr}${top mem 9}
${color orange}${voffset 2}${hr 1}
#------------+
# Storage    |
#------------+
${color1}RAM Use/Free:${goto 148}${color red}$mem ${color red} ${goto 220}${membar 15,100} $alignr${color}${memeasyfree}
${color1}Linux Root:${goto 148}${color red}${fs_used /} ${color red} ${goto 220}${fs_bar 15,100 /} $alignr${color}${fs_free /}
${color1}Ubuntu 18.04:${goto 148}${if_mounted /mnt/clone}${color red} ${fs_used /mnt/clone} ${color red} ${goto 220}${fs_bar 15,100 /mnt/clone} $alignr${color}${fs_free /mnt/clone}${else} ${color yellow} /mnt/clone ${endif}
${color1}${if_mounted /mnt/old}Broken 16.04:${goto 148}${color red} ${fs_used /mnt/old} ${color red} ${goto 220}${fs_bar 15,100 /mnt/old} $alignr${color}${fs_free /mnt/old}${else}Cache RAM:${goto 148}${color green}${cached} ${color1} ${alignr}Buffers: ${color green} ${buffers}${endif}
${color1}${if_mounted /mnt/e}WSL+Linux:${goto 148}${color red}${fs_used /mnt/e} ${color red} ${goto 220}${fs_bar 15,100 /mnt/e} $alignr${color}${fs_free /mnt/e}${else}Swap:${goto 148}${color green}${swap} / ${swapmax} $alignr${color green}${swapperc}%${endif}
#${color}NVMe Win 10:${goto 148}${if_mounted /mnt/c}${color green} ${fs_used /mnt/c} / ${fs_size /mnt/c} $alignr${color green}${fs_used_perc /mnt/c}%${else}${color yellow}/mnt/c${endif}
#${color}${if_mounted /mnt/d}HGST_Win10:${goto 148}${color red} ${fs_used /mnt/d} / ${fs_size /mnt/d} $alignr${color green}${fs_used_perc /mnt/d}%${else}Cache RAM:${goto 148}${color green}${cached} ${color} Buffers: ${color green} ${buffers}${endif}
#${color}${if_mounted /mnt/e}WSL+Linux:${goto 148}${color red}${fs_used /mnt/e} / ${fs_size /mnt/e} $alignr${color red}${fs_used_perc /mnt/e}%${else}Swap:${goto 148}${color green}${swap} / ${swapmax} $alignr${color green}${swapperc}%${endif}
${color orange}${voffset 2}${hr 1}
#------------+
# Network    |
#------------+
#${color1}Network using vnStat "-i", "-w" and "-m"
${color}${goto 5}Today ${goto 100}Yesterday ${goto 225}Week ${goto 325}Month ${color green}
# vnstatd updates database every five minutes
${execi 300 vnstat -i enp59s0 | grep "today" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 110}${execi 300 vnstat -i enp59s0 | grep "yesterday" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 220}${execi 300 vnstat -i enp59s0 -w | grep "current week" | awk '{print $9" "substr ($10, 1, 1)}'} ${goto 315}${execi 300 vnstat -i enp59s0 -m | grep "`date +"%b '%y"`" | awk '{print $9" "substr ($10, 1, 1)}'}
${color}Down: ${color green}${downspeed enp59s0}/s ${color}${goto 220}Up: ${color green}${upspeed enp59s0}/s
${downspeedgraph enp59s0 25,190 000000 ff0000} ${alignr}${upspeedgraph enp59s0 25,190 000000 00ff00}$color
Total: ${color green}${totaldown enp59s0} $color${alignr}Total: ${color green}${totalup enp59s0}
#Bit Rate:$color ${wireless_bitrate wlp60s0}
#------------+
# Brightness |
#------------+
${color orange}${voffset 2}${hr 1}
${color1}${goto 5}Rise: ${color green}${execpi 300 cat /usr/local/bin/.eyesome-sunrise} ${goto 155}${color1}Set: ${color green}${execpi 300 cat /usr/local/bin/.eyesome-sunset} ${alignr}${color1}Level: ${color green}${execpi 10 cat /sys/class/backlight/intel_backlight/brightness}

${color orange}${voffset 2}${hr 1}
${color orange}${voffset 2}${hr 1}
```

  [1]: https://i.stack.imgur.com/YOJ9H.gif
