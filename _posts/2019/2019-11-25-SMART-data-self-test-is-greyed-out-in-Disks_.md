---
layout:       post
title:        >
    SMART data self test is greyed out in Disks?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1191538
type:         Answer
tags:         disk smart
created_date: 2019-11-25 12:26:14
edit_date:    
votes:        "11 "
favorites:    
views:        "11,103 "
accepted:     
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-11-25-SMART-data-self-test-is-greyed-out-in-Disks_.md
toc:          false
navigation:   false
clipboard:    false
---

From [How can I check the SMART status of a SSD or HDD on current versions of Ubuntu 14.04 through 18.10?](How can I check the SMART status of a SSD or HDD on current versions of Ubuntu 14.04 through 18.10?)

> ## SMART option greyed out  
>   
> This can happen with NVMe SSD's. You need to install NVMe SSD specific  
> SMART tools:  
>   
>     sudo apt install nvme-cli  
>   
> Then run the program to report health of drive:  
>   
>     $ sudo nvme smart-log /dev/nvme0  
>     Smart Log for NVME device:nvme0 namespace-id:ffffffff  
>     critical_warning                    : 0  
>     temperature                         : 40 C  
>     available_spare                     : 100%  
>     available_spare_threshold           : 10%  
>     percentage_used                     : 0%  
>     data_units_read                     : 28,167,888  
>     data_units_written                  : 19,397,424  
>     host_read_commands                  : 561,183,142  
>     host_write_commands                 : 171,788,833  
>     controller_busy_time                : 1,354  
>     power_cycles                        : 2,385  
>     power_on_hours                      : 1,363  
>     unsafe_shutdowns                    : 133  
>     media_errors                        : 0  
>     num_err_log_entries                 : 608  
>     Warning Temperature Time            : 0  
>     Critical Composite Temperature Time : 0  
>     Temperature Sensor 1                : 40 C  
>     Temperature Sensor 2                : 51 C  
>   
> The most important data point is:  
>   
>     percentage_used                     : 0%  
>   
> When it hits 100% it is time worry about replacing your drive. That  
> said this drive is two years old and still at `0%`  

