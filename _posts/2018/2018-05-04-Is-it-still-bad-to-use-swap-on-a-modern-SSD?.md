---
layout:       post
title:        >
    Is it still bad to use swap on a modern SSD?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1032093
type:         Answer
tags:         ssd swap 18.04 memory-usage
created_date: 2018-05-04 17:49:40
edit_date:    2020-06-12 14:37:07
votes:        "14 "
favorites:    
views:        "17,907 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    true
---

I have the exact same SSD w/512 GB and Ubuntu 16.04 setup an GB SWAP partition on it. I see no problem because:

- with 8 GB RAM the swap is never used so no worry of shortening 10 year life span.
- I typically shelf laptops after two years and buy a new one.
- If I do get into Virtual Machines (VM's) some day I'll upgrade to 16 or 32 GB RAM as soon as I see SWAP being used.
- The only other option would be 1 TB HDD and I'd like to keep that as destructible storage space and not worry about it.
- The only downside is expensive real estate parking SWAP on most expensive SSD but Ubuntu only uses 16 GB and Windows 10 is only using 110 GB of 385 GB allocated.
- An advantage is if SWAP is ever used for massive memory leak then OOM-Killer (out of memory killer) will tell me 20 times faster I have a problem. This is because I believe our SSD's are about 20 times faster than the average hard drive.

## Monitoring Samsung Pro 960 M.2 NVMe Gen 3.0 x 4 SSD

First step is to install `nvme-cli` because it provides the most information:

``` 
sudo apt install nvme-cli

```

Next gather information available from SSD:

{% include copyHeader.html %}
``` 
$ sudo nvme smart-log /dev/nvme0
Smart Log for NVME device:nvme0 namespace-id:ffffffff
critical_warning                    : 0
temperature                         : 36 C
available_spare                     : 100%
available_spare_threshold           : 10%
percentage_used                     : 0%
data_units_read                     : 8,743,226
data_units_written                  : 4,763,574
host_read_commands                  : 147,308,749
host_write_commands                 : 47,032,599
controller_busy_time                : 343
power_cycles                        : 519
power_on_hours                      : 376
unsafe_shutdowns                    : 66
media_errors                        : 0
num_err_log_entries                 : 198
Warning Temperature Time            : 0
Critical Composite Temperature Time : 0
Temperature Sensor 1                : 36 C
Temperature Sensor 2                : 43 C
Temperature Sensor 3                : 0 C
Temperature Sensor 4                : 0 C
Temperature Sensor 5                : 0 C
Temperature Sensor 6                : 0 C
Temperature Sensor 7                : 0 C
Temperature Sensor 8                : 0 C

```

The most important field is `Percentage used` which shows as 0%. This isn't disk usage percent but life used percent. I've had this drive since October 2017 and now it's May 2018. As soon as `Percentage used` hits 1% I can multiply the number of months I've owned it by 100 to find out when it will die. But they say the drive typically lives longer than that.

### [Source][1]


  [1]: https://www.percona.com/blog/2017/02/09/using-nvme-command-line-tools-to-check-nvme-flash-health/
