---
layout:       post
title:        >
    Should I turn off kernel logging (and how?) if I'm running off an SSD?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188283
type:         Answer
tags:         kernel kubuntu dell ssd
created_date: 2019-11-12 20:34:12
edit_date:    2020-06-12 14:37:07
votes:        "10 "
favorites:    
views:        "3,108 "
accepted:     
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   false
clipboard:    true
---

The linux kernel is well aware of SSDs for a long time and default installations seem to work just fine "out-of-the-box".

I would leave logging and everything else to the default settings. From time to time I would monitor the life span of the SSD:

- [Is it still bad to use swap on a modern SSD?]({% post_url /2018/2018-05-04-Is-it-still-bad-to-use-swap-on-a-modern-SSD? %})

The above answer details how to check your remaining life of your SSD:

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
temperature                         : 42 C
available_spare                     : 100%
available_spare_threshold           : 10%
percentage_used                     : 0%
data_units_read                     : 28,149,264
data_units_written                  : 19,392,109
host_read_commands                  : 559,538,536
host_write_commands                 : 171,732,762
controller_busy_time                : 1,352
power_cycles                        : 2,384
power_on_hours                      : 1,362
unsafe_shutdowns                    : 133
media_errors                        : 0
num_err_log_entries                 : 608
Warning Temperature Time            : 0
Critical Composite Temperature Time : 0
Temperature Sensor 1                : 42 C
Temperature Sensor 2                : 55 C

```

The percentage used is `0%` after two years. When it hits `100%` then theoretically the drive is all used up and needs replacing. But here is someone who has used up `250%` which one would think impossible:

- [Wearing out an SSD][1]

To make a long story short, chances are your SSD will outlast your computer system these days.

  [1]: http://smalldatum.blogspot.com/2017/10/wearing-out-ssd.html
