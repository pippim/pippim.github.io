---
layout:       post
title:        >
    How to test oom-killer from command line
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1188025
type:         Answer
tags:         command-line ram memory-usage
created_date: 2019-11-11 20:36:34
edit_date:    2019-11-12 20:10:47
votes:        "2 "
favorites:    
views:        "8,426 "
accepted:     
uploaded:     2022-01-07 19:20:08
toc:          false
navigation:   false
clipboard:    true
---

## Revised answer

My initial answer took 1/2 hour to execute and has been dropped in this revision:

``` 
ls -d /*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*

```

I'll accept someone else's answer as a faster way of invoking `oom-killer` from the command line. As a revised answer I'll explain how to get relevant oom-killer details from `journalctl` and what they mean.


----------


This [more efficient answer][1] by [mjoao][2] to use up RAM:

``` 
logger --tag="kernel" "Start for oom-killer"; a=""; for b in {0..99999999}; do a=$b$a$a$a$a$a$a; done

```

The `logger` command was prepended to give a timestamp in `journalctl` for when the RAM eating process starts.

After oom-killer is finished, open a new terminal and type `oomlog` (script contents later on):

``` 
$ oomlog
Nov 12 12:29:23 alien kernel[19202]: Start for oom-killer
Nov 12 12:30:02 alien kernel: 31981 total pagecache pages
Nov 12 12:30:02 alien kernel: 11627 pages in swap cache
Nov 12 12:30:02 alien kernel: Swap cache stats: add 10739122, delete 10727632, find 8444277/9983565
Nov 12 12:30:02 alien kernel: Free swap  = 0kB
Nov 12 12:30:02 alien kernel: Total swap = 8252412kB
Nov 12 12:30:02 alien kernel: 2062044 pages RAM
Nov 12 12:30:02 alien kernel: 0 pages HighMem/MovableOnly
Nov 12 12:30:02 alien kernel: 56052 pages reserved
Nov 12 12:30:02 alien kernel: 0 pages cma reserved
Nov 12 12:30:02 alien kernel: 0 pages hwpoisoned
Nov 12 12:30:02 alien kernel: [ pid ]   uid  tgid total_vm      rss nr_ptes nr_pmds swapents oom_score_adj name
Nov 12 12:30:02 alien kernel: [ 4358]  1000  4358  2853387  1773446    5578      13  1074744             0 bash
Nov 12 12:30:02 alien kernel: Out of memory: Kill process 4358 (bash) score 701 or sacrifice child
Nov 12 12:30:02 alien kernel: Killed process 4358 (bash) total-vm:11413548kB, anon-rss:7093784kB, file-rss:0kB, shmem-rss:0kB
Nov 12 12:30:03 alien kernel: oom_reaper: reaped process 4358 (bash), now anon-rss:0kB, file-rss:0kB, shmem-rss:0kB

```

The better answer takes 30 seconds to use up RAM which is not too fast (like `tail /dev/zero`) and not too slow (like my original answer).

The `oomlog` script condenses many pages of `journalctl` output into 16 lines.

The `oom-killer` **[ pid ]** fields are explained [here][3]:

> -    **pid** The process ID.  
> -    **uid** User ID.  
> -    **tgid** Thread group ID.  
> -    **total_vm** Virtual memory use (in 4 kB pages)  
> -    **rss** Resident memory use (in 4 kB pages)  
> -    **nr_ptes** Page table entries  
> -    **swapents** Swap entries  
> -    **oom_score_adj** Usually 0; a lower number indicates the process will be less likely to die when the OOM killer is invoked.  


----------


## oomlog bash script

<!-- Language-all: lang-bash -->


{% include copyHeader.html %}
``` 
#!/bin/bash

# NAME: oomlog
# PATH: $HOME/askubuntu/
# DESC: For: https://askubuntu.com/questions/1188024/how-to-test-oom-killer-from-command-line
# DATE: November 12, 2019.
# PARM: Parameter 1 can be journalctl boot sequence, eg -b-2 for two boots ago.
#       Defaults to -b-0 (current boot).

BootNo="-b-0"
[[ $1 != "" ]] && BootNo="$1"

# Get time stamp if recorded with `logger` command:
journalctl "$BootNo" | grep 'Start for oom-killer' | tail -n1
# Print headings for last oom-killer
journalctl "$BootNo" | grep '\[ pid ]' -B10 | tail -n11
# Get lat oom_reaper entry's PID
PID=$(journalctl "$BootNo" | grep oom_reaper | tail -n1 | cut -d' ' -f9)
# Print pid information
journalctl "$BootNo" | grep "$PID"']' | tail -n1
# Print summary infomation
journalctl "$BootNo" | grep oom_reaper -B2 | tail -n3

```


  [1]: https://askubuntu.com/a/1188169/307523
  [2]: https://askubuntu.com/users/1015058/mjoao
  [3]: https://unix.stackexchange.com/questions/128642/debug-out-of-memory-with-var-log-messages
