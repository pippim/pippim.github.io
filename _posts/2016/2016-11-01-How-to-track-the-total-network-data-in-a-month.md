---
layout:       post
title:        >
    How to track the total network data in a month
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/844317
type:         Answer
tags:         networking conky monitoring system-monitor vnstat
created_date: 2016-11-01 17:28:52
edit_date:    2021-08-05 10:19:27
votes:        "22 "
favorites:    
views:        "38,721 "
accepted:     
uploaded:     2022-02-10 04:59:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-01-How-to-track-the-total-network-data-in-a-month.md
toc:          false
navigation:   false
clipboard:    false
---

# vnStat - Light Weight Console-based Network Monitor

**vnStat** is a console-based network traffic monitor for Linux and BSD that keeps a log of network traffic for the selected interface(s). It uses the network interface statistics provided by the kernel as information source. This means that vnStat won't actually be sniffing any traffic and also ensures light use of system resources.

In this tutorial we'll review:

 - Features
 - Installation
 - Configuration
 - Start Systemd Service
 - Usage (from command line)
 - Conky example

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

# Installation

nvStat is in the official repositories so no need to link to a new ppa. To install create a Terminal instance using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> and type at the prompt:

``` 
sudo apt-get install vnstat
```

After installation, keep your Terminal open for the following sections. There is no need to reboot.

# Configuration

Pick a preferred network interface and edit the Interface variable in the  `/etc/vnstat.conf` accordingly. To the list all interfaces available to vnstat, use:

``` 
vnstat --iflist
```

To start monitoring a particular interface you must initialize a database first. Each interface needs its own database. The command to initialize one for the eth0 interface is:

``` 
sudo vnstat -u -i eth0 
```

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

# Monthly Totals

To see monthly totals, use:

``` 
rick@dell:~$ vnstat -m

 eth0  /  monthly

       month        rx      |     tx      |    total    |   avg. rate
    ------------------------+-------------+-------------+---------------
      Nov '16     76.31 MiB |    2.03 MiB |   78.35 MiB |   10.45 kbit/s
    ------------------------+-------------+-------------+---------------
    estimated      3.13 GiB |      84 MiB |    3.21 GiB |
```

# Conky example

Conky is a popular light-weight System Monitor used across many Linux distributions. You can vnStat bandwidth totals to your conky display like this:

[![enter image description here][1]][1]

Note when picture was taken `Yesterday` was Sunday which explains why the Weekly total is less.

The conky code to achieve this is:

``` 
${color orange}${voffset 2}${hr 1}
${color1}Network using vnStat "-i", "-w" and "-m"
${color}${goto 5}Today ${goto 100}Yesterday ${goto 225}Week ${goto 325}Month ${color green}
${execi 300 vnstat -i eth0 | grep "today" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 110}${execi 300 vnstat -i eth0 | grep "yesterday" | awk '{print $8" "substr ($9, 1, 1)}'} ${goto 220}${execi 300 vnstat -i eth0 -w | grep "current week" | awk '{print $9" "substr ($10, 1, 1)}'} ${goto 315}${execi 300 vnstat -i eth0 -m | grep "`date +"%b '%y"`" | awk '{print $9" "substr ($10, 1, 1)}'}
${color orange}${voffset 2}${hr 1}
```

To save space on my narrow window I used "G" instead of "GiB", "M" instead of "MiB", etc. If you have more screen realestate change `substr ($10, 1, 1)` to `$10` and the same for `$9`.

You may have to change `eth0` to `wlan0` or `eth1`, etc. depending on your network name reported by `ifconfig`.


  [1]: https://i.stack.imgur.com/vDbR5.png

<!-- dummy comment to fulfill minimum character limit -->
