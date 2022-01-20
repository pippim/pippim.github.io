---
layout:       post
title:        >
    How do I check system health?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1038711
type:         Answer
tags:         software-recommendation hardware hardware-test conky
created_date: 2018-05-21 13:37:40
edit_date:    2020-10-12 02:07:35
votes:        "12 "
favorites:    
views:        "28,587 "
accepted:     
uploaded:     2022-01-19 20:21:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-21-How-do-I-check-system-health^.md
toc:          false
navigation:   false
clipboard:    true
---

Electronics generally work 100% or zero percent. Mechanical devices such as hard drives do have indicators of impending failure as per **SMART** reporting which you already know about.


### Fans

Fans have impending failure indicators but that is based on your hearing and listening for indicators such as oscillating speeds, squealing bearings, etc. 

### CPU

Another potential indicator of a degrading fan is CPU heat level. On a laptop means fan exhaust vents are clogged or RPM is too low. It could also mean CPU / motherboard needs a dust cleaning with compressed air (don't use your breath which contains moisture). It could also mean your CPU heat sink needs to be reseated with new thermal paste.

### RAM

If your machine locks up and display a bad memory error you can test your RAM following these instructions: [How to check for errors in RAM via linux?][1].

If the RAM checker finds a bad memory block you can blacklist it using these instructions: [Is there a way of limiting the Kernel&#39;s memory manager to use only 75% of memory?][2]

### NVMe PCIe M.2 Gen 3.0 x 4 (or 2) SSD

If you have an SSD they're life span is measured in trillions of writes. Your **SMART** utility already measures SSD life but not for NVMe SSDs. For that you need `nvme-cli`. To install it use:

``` 
sudo apt install nvme-cli
```

Next gather information available from SSD:

{% include copyHeader.html %}
``` 
$ sudo nvme smart-log /dev/nvme0
Smart Log for NVME device:nvme0 namespace-id:ffffffff
critical_warning                    : 0
temperature                         : 40 C
available_spare                     : 100%
available_spare_threshold           : 10%
percentage_used                     : 0%
data_units_read                     : 12,539,332
data_units_written                  : 10,623,582
host_read_commands                  : 281,194,884
host_write_commands                 : 96,528,713
controller_busy_time                : 672
power_cycles                        : 1,677
power_on_hours                      : 687
unsafe_shutdowns                    : 105
media_errors                        : 0
num_err_log_entries                 : 279
Warning Temperature Time            : 0
Critical Composite Temperature Time : 0
Temperature Sensor 1                : 40 C
Temperature Sensor 2                : 51 C
Temperature Sensor 3                : 0 C
Temperature Sensor 4                : 0 C
Temperature Sensor 5                : 0 C
Temperature Sensor 6                : 0 C
Temperature Sensor 7                : 0 C
Temperature Sensor 8                : 0 C
```

The most important field is `Percentage used` which shows as 0%. This isn't disk usage percent but **life used** percent. The drive was purchased in October 2017 and it was still `0%` in December 2018. The `Percentage used` hit 1% on October 2020. At this rate the NVMe SSD lifespan will be 300 years. Of course it will be obsolete well before then...

### System Monitor on desktop with `conky`

Many people like to show their system status (and health) on a portion of their desktop. I like to keep my Conky running on the right 20% of my primary monitor:

[![Conky all.gif][3]][3]

**Note:** The 97% CPU usage on single CPU is caused by screen recorder itself.

To learn more about `conky` and CPU usage see: [How do I stress test CPU and RAM (at the same time)?][4]


  [1]: https://askubuntu.com/questions/343114/how-to-check-for-errors-in-ram-via-linux?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  [2]: {% post_url /2018/2018-05-03-Is-there-a-way-of-limiting-the-Kernel^s-memory-manager-to-use-only-75^-of-memory^ %}
  [3]: https://i.stack.imgur.com/2TQWO.gif
  [4]: {% post_url /2017/2017-08-23-How-do-I-stress-test-CPU-and-RAM-^at-the-same-time^^ %}
