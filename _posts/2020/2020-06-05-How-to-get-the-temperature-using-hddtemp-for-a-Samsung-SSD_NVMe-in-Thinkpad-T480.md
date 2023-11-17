---
layout:       post
title:        >
    How to get the temperature using hddtemp for a Samsung SSD/NVMe in Thinkpad T480
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1247294
type:         Answer
tags:         ssd thinkpad temperature nvme
created_date: 2020-06-05 17:29:48
edit_date:    2020-06-12 14:37:07
votes:        "4 "
favorites:    
views:        "7,385 "
accepted:     
uploaded:     2023-11-17 06:20:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-06-05-How-to-get-the-temperature-using-hddtemp-for-a-Samsung-SSD_NVMe-in-Thinkpad-T480.md
toc:          false
navigation:   false
clipboard:    false
---

From:

- [How do I check system health?]({% post_url /2018/2018-05-21-How-do-I-check-system-health_ %})

### NVMe PCIe M.2 Gen 3.0 x 4 (or 2) SSD

If you have an SSD they're life span is measured in trillions of writes. Your **SMART** utility already measures SSD life but not for NVMe SSDs. For that you need `nvme-cli`. To install it use:

``` 
sudo apt install nvme-cli
```

Next gather information available from SSD:

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

The most important field is `Percentage used` which shows as 0%. This isn't disk usage percent but **life used** percent. I've had this drive since October 2017 and now it's December 2018. As soon as `Percentage used` hits 1% I can multiply the number of months I've owned it by 100 to find out when it will die. At the current rate I can say the drive will live 100+ years. Of course it will be obsolete in ten years anyway.

Notice the **temperature** report.
