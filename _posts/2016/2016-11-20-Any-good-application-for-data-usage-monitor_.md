---
layout:       post
title:        >
    Any good application for data usage monitor?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/851703
type:         Answer
tags:         software-recommendation broadband vnstat conky
created_date: 2016-11-20 22:49:02
edit_date:    2018-01-13 16:40:21
votes:        "10 "
favorites:    
views:        "39,581 "
accepted:     
uploaded:     2022-02-22 04:32:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-20-Any-good-application-for-data-usage-monitor_.md
toc:          false
navigation:   true
clipboard:    false
---


<a id="hdr1"></a>
<div class="hdr-bar">  <a href="#hdr2">Skip</a></div>

# vnStat - Light Weight Console-based Network Monitor

**vnStat** is a console-based network traffic monitor for Linux and BSD that keeps a log of network traffic for the selected interface(s). It uses the network interface statistics provided by the kernel as information source. This means that vnStat won't actually be sniffing any traffic and also ensures light use of system resources.

In this tutorial we'll review:

 - Features
 - Installation
 - Configuration
 - Start Systemd Service
 - Usage (from command line)
 - Conky Real Time Display example


<a id="hdr2"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr1">ToS</a>  <a href="#hdr3">Skip</a></div>

# Features

 - quick and simple to install and get running
 - gathered statistics persists through system reboots
 - can monitor multiple interfaces at the same time
 - several output options
 - summary, hourly, daily, monthly, weekly, top 10 days
 - optional png image output (using libgd) 
 - months can be configured to follow billing period
 - light, minimal resource usage
 - same low cpu usage regardless of traffic
 - can be used without root permissions
 - online color configuration editor


<a id="hdr3"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr2">ToS</a>  <a href="#hdr4">Skip</a></div>

# Installation

nvStat is in the official repositories so no need to link to a new ppa. To install create a Terminal instance using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and type at the prompt:

``` 
sudo apt-get update
sudo apt-get install vnstat
```

After installation, keep your Terminal open for the following sections. There is no need to reboot.

# Configuration

Pick a preferred network interface and edit the Interface variable in the  `/etc/vnstat.conf` accordingly. To the list all interfaces available to vnstat, use:

``` 
$ vnstat --iflist
Available interfaces: wlp60s0 lo enp59s0 (1000 Mbit)
```

To start monitoring a particular interface you must initialize a database first. Each interface needs its own database. The command to initialize one for the eth0 interface is:

``` 
sudo vnstat -u -i enp59s0 
```


<a id="hdr4"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr3">ToS</a>  <a href="#hdr5">Skip</a></div>

# Start Systemd Service

After introducing the interface(s) and checking the config file. You can start the monitoring process via `systemd`:

``` 
sudo systemctl start vnstat.service
```

To make this service permanent use:

``` 
sudo systemctl enable vnstat.service
```

From now on `vnstat` will be gathering network usage in the background using such a small percentage of CPU it doesn't show up on conky's (system monitor's) top 9 list of processes (on my machine).


<a id="hdr5"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr4">ToS</a>  <a href="#hdr6">Skip</a></div>

# Usage (from Command Line)

Query the network traffic:

``` 
vnstat -q
```

Viewing live network traffic usage:

``` 
vnstat -l
```

To find more options, use:

``` 
vnstat --help
```


<a id="hdr6"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr5">ToS</a>  <a href="#hdr7">Skip</a></div>

# Monthly Totals

To see monthly totals, use:

``` 
$ vnstat -m

 enp59s0  /  monthly

       month        rx      |     tx      |    total    |   avg. rate
    ------------------------+-------------+-------------+---------------
      Oct '17      2.02 GiB |    1.57 GiB |    3.59 GiB |   11.25 kbit/s
      Nov '17     58.28 GiB |   24.58 GiB |   82.86 GiB |  268.17 kbit/s
      Dec '17    143.23 GiB |   13.64 GiB |  156.87 GiB |  491.31 kbit/s
      Jan '18    102.77 GiB |   30.21 GiB |  132.97 GiB |    1.04 Mbit/s
    ------------------------+-------------+-------------+---------------
    estimated    257.06 GiB |   75.56 GiB |  332.62 GiB |
```


<a id="hdr7"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr6">ToS</a>  <a href="#hdr8">Skip</a></div>

# Conky Real Time Display example

Conky is a popular light-weight System Monitor used across many Linux distributions. You can show vnStat bandwidth totals in your conky display like this:

[![Conky Network Realtime 5.gif][1]][1]

*30 second .gif of Conky's relevant section*

The Conky code to produce this display is:

``` 
${color orange}${voffset 2}${hr 1}
${color}Memory:${goto 148}${color green}$mem / $memmax $alignr${color green}${memperc /}%
${color}Linux:${goto 148}${color green}${fs_used /} / ${fs_size /} $alignr${color green}${fs_used_perc /}%
${color}NVMe Win 10:${goto 148}${if_mounted /mnt/c}${color green} ${fs_used /mnt/c} / ${fs_size /mnt/c} $alignr${color green}${fs_used_perc /mnt/c}%${else}${color yellow}/mnt/c${endif}
${color}${if_mounted /mnt/d}HGST_Win10:${goto 148}${color green} ${fs_used /mnt/d} / ${fs_size /mnt/d} $alignr${color green}${fs_used_perc /mnt/d}%${else}Cache RAM:${goto 148}${color green}${cached} ${color} Buffers: ${color green} ${buffers}${endif}
${color}${if_mounted /mnt/e}WSL+Linux:${goto 148}${color green}${fs_used /mnt/e} / ${fs_size /mnt/e} $alignr${color green}${fs_used_perc /mnt/e}%${else}Swap:${goto 148}${color green}${swap} / ${swapmax} $alignr${color green}${swapperc}%${endif}
${color orange}${voffset 2}${hr 1}
${color1}Network using vnStat "-i", "-w" and "-m"
${color}${goto 5}Today ${goto 100}Yesterday ${goto 225}Week ${goto 325}Month ${color green}
${execi 10 vnstat -i enp59s0 | grep "today" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 110}${execi 10 vnstat -i enp59s0 | grep "yesterday" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 220}${execi 10 vnstat -i enp59s0 -w | grep "current week" | awk '{print $9" "substr ($10, 1, 1)}'} ${goto 315}${execi 10 vnstat -i enp59s0 -m | grep "`date +"%b '%y"`" | awk '{print $9" "substr ($10, 1, 1)}'}
${color}Down: ${color green}${downspeed enp59s0}/s ${color}${goto 220}Up: ${color green}${upspeed enp59s0}/s
${downspeedgraph enp59s0 25,190 000000 ff0000} ${alignr}${upspeedgraph enp59s0 25,190 000000 00ff00}$color
Total: ${color green}${totaldown enp59s0} $color${alignr}Total: ${color green}${totalup enp59s0}
${color orange}${voffset 2}${hr 1}
${color}${goto 5}Dawn: ${color green}${execpi 300 cat /usr/local/bin/sunrise} ${goto 155}${color}Dusk: ${color green}${execpi 300 cat /usr/local/bin/sunset} ${alignr}${color}Level: ${color green}${execpi 10 cat /sys/class/backlight/intel_backlight/brightness}
${color orange}${voffset 2}${hr 1}
```

To save desktop space, my narrow Conky window uses "G" instead of "GiB", "M" instead of "MiB", etc. If you have more screen real estate change `substr ($10, 1, 1)` to `$10` and do the same for `$9`.

You may have to change `enp59s0` to `eth0`, `wlan0` or `eth1`, etc. depending on your network name reported by `ifconfig`.


  [1]: https://i.stack.imgur.com/oktjX.gif


<a id="hdr8"></a>
<div class="hdr-bar">  <a href="#">Top</a>  <a href="#hdr7">ToS</a></div>

