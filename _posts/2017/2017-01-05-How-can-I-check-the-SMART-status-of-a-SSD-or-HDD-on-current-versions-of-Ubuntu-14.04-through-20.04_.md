---
layout:       post
title:        >
    How can I check the SMART status of a SSD or HDD on current versions of Ubuntu 14.04 through 20.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/868179
type:         Answer
tags:         hard-drive ssd smart
created_date: 2017-01-05 03:07:18
edit_date:    2019-11-13 02:36:22
votes:        "23 "
favorites:    
views:        "309,571 "
accepted:     
uploaded:     2022-05-05 04:39:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-01-05-How-can-I-check-the-SMART-status-of-a-SSD-or-HDD-on-current-versions-of-Ubuntu-14.04-through-20.04_.md
toc:          false
navigation:   false
clipboard:    true
---

## Ubuntu 16.04

This answer is migrated from a duplicate question closed here ([What happend to SMART data (disk selftest option)][1]).

The question above has been changed to require Ubuntu versions after 14.04 but the answers haven't changed and don't apply to Ubuntu 16.04. As such it caused confusion as described in the closed question.

Select `Dash` the first option on the `Launcher` and type `disks`. Select the icon that appears. If the `disks` program isn't available you need to install it first with:

``` 
sudo apt-get install gnome-disk-utility
```

The `disks` main screen looks like this:

[![disks main][2]][2]

Notice the "hamburger" menu in the top right corner. Select it to get a drop down menu where you can select the SMART screen shown below:

[![disks SMART][3]][3]

If you require further explanation please comment below.


----------

## SMART option greyed out

In comments it was mentioned the SMART option was greyed out. This can happen with NVMe SSD's. In this case referring to this answer:

- [How do I check system health?]({% post_url /2018/2018-05-21-How-do-I-check-system-health_ %})

You need to first install NVMe SSD specific SMART tools:

``` 
sudo apt install nvme-cli
```

Then run the program to report health of drive:

{% include copyHeader.html %}
``` 
$ sudo nvme smart-log /dev/nvme0
Smart Log for NVME device:nvme0 namespace-id:ffffffff
critical_warning                    : 0
temperature                         : 40 C
available_spare                     : 100%
available_spare_threshold           : 10%
percentage_used                     : 0%
data_units_read                     : 28,167,888
data_units_written                  : 19,397,424
host_read_commands                  : 561,183,142
host_write_commands                 : 171,788,833
controller_busy_time                : 1,354
power_cycles                        : 2,385
power_on_hours                      : 1,363
unsafe_shutdowns                    : 133
media_errors                        : 0
num_err_log_entries                 : 608
Warning Temperature Time            : 0
Critical Composite Temperature Time : 0
Temperature Sensor 1                : 40 C
Temperature Sensor 2                : 51 C
```

The most important data point is:

``` 
percentage_used                     : 0%
```

When it hits 100% it is time worry about replacing your drive. That said this drive is two years old and still at `0%`

  [1]: https://askubuntu.com/questions/865628/what-happend-to-smart-data-disk-selftest-option/865633?noredirect=1#comment1344034_865633
  [2]: https://i.stack.imgur.com/lb9q5.png
  [3]: https://i.stack.imgur.com/7Hbj5.png
