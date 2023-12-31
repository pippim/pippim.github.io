---
layout:       post
title:        >
    files created then deleted at every second in tmp directory
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1132590
type:         Answer
tags:         files tmp
created_date: 2019-04-10 01:27:23
edit_date:    
votes:        "0 "
favorites:    
views:        "5,481 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-10-files-created-then-deleted-at-every-second-in-tmp-directory.md
toc:          false
navigation:   false
clipboard:    false
---

You were using the wrong `/dev/nvme0...` name:

``` 
$ sudo tune2fs -l /dev/nvme0n1
tune2fs 1.42.13 (17-May-2015)
tune2fs: Bad magic number in super-block while trying to open /dev/nvme0n1
Couldn't find valid filesystem superblock.
```

The right format is:

``` 
$ sudo tune2fs -l /dev/nvme0n1p6
tune2fs 1.42.13 (17-May-2015)
Filesystem volume name:   New_Ubuntu_16.04
Last mounted on:          /
Filesystem UUID:          b40b3925-70ef-447f-923e-1b05467c00e7
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent flex_bg sparse_super large_file huge_file uninit_bg dir_nlink extra_isize
Filesystem flags:         signed_directory_hash 
Default mount options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              2953920
Block count:              11829504
Reserved block count:     534012
Free blocks:              6883701
Free inodes:              2277641
First block:              0
Block size:               4096
Fragment size:            4096
Reserved GDT blocks:      1021
Blocks per group:         32768
Fragments per group:      32768
Inodes per group:         8160
Inode blocks per group:   510
Flex block group size:    16
Filesystem created:       Thu Aug  2 20:14:59 2018
Last mount time:          Thu Apr  4 21:05:29 2019
Last write time:          Thu Feb 14 21:36:27 2019
Mount count:              377
Maximum mount count:      -1
Last checked:             Thu Aug  2 20:14:59 2018
Check interval:           0 (<none>)
Lifetime writes:          4920 GB
Reserved blocks uid:      0 (user root)
Reserved blocks gid:      0 (group root)
First inode:              11
Inode size:	          256
Required extra isize:     28
Desired extra isize:      28
Journal inode:            8
First orphan inode:       1308352
Default directory hash:   half_md4
Directory Hash Seed:      a179d56c-6c68-468c-8070-ffa5bb7cd973
Journal backup:           inode blocks
```

As far as [lifetime of NVMe SSD][1] goes:

``` 
$ sudo nvme smart-log /dev/nvme0
Smart Log for NVME device:nvme0 namespace-id:ffffffff
critical_warning                    : 0
temperature                         : 38 C
available_spare                     : 100%
available_spare_threshold           : 10%
percentage_used                     : 0%
data_units_read                     : 22,351,778
data_units_written                  : 14,667,833
host_read_commands                  : 379,349,109
host_write_commands                 : 127,359,479
controller_busy_time                : 952
power_cycles                        : 1,925
power_on_hours                      : 1,016
unsafe_shutdowns                    : 113
media_errors                        : 0
num_err_log_entries                 : 598
Warning Temperature Time            : 0
Critical Composite Temperature Time : 0
Temperature Sensor 1                : 38 C
Temperature Sensor 2                : 49 C
Temperature Sensor 3                : 0 C
Temperature Sensor 4                : 0 C
Temperature Sensor 5                : 0 C
Temperature Sensor 6                : 0 C
Temperature Sensor 7                : 0 C
Temperature Sensor 8                : 0 C
```

The key line here is:

``` 
percentage_used                     : 0%
```

After 18 months of use the SSD percentage use is 0%. If after 3 years of use it hits 1% then I know the SSD will last 300 years.

Obviously this answer would not fit into comment section to reply to other comments.


  [1]: https://askubuntu.com/a/1038711/307523
