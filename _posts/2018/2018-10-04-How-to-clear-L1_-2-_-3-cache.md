---
layout:       post
title:        >
    How to clear L1, 2 & 3 cache
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1080767
type:         Answer
tags:         command-line cpu cache
created_date: 2018-10-04 03:40:38
edit_date:    
votes:        "1 "
favorites:    
views:        "2,951 "
accepted:     Accepted
uploaded:     2025-10-19 18:25:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-04-How-to-clear-L1_-2-_-3-cache.md
toc:          false
navigation:   false
clipboard:    false
---

From: [Way to flush/ clear the RAM and cache memories][1]

> It is not possible to do this with complete effectiveness at user  
> level.  Performance counters in the uncore can be used to derive the  
> mapping of physical addresses to L3 slices (CBos) for any address  
> range that the user can allocate and test, but that only tells you  
> which CBo is being used, not which congruence class within that slice  
> is being used.   The size of the L3 slices suggests a straightforward  
> mapping, but I don't know of any demonstrations that confirm the  
> internal mapping.  
>   
> At the gross level, on Xeon E5 v3 systems, reading an array that is 4x  
> larger than the L3 cache size will clear nearly 100% of the prior data  
> from the L1, L2, and L3 caches.  This only requires process binding  
> (e.g., "taskset" or "numactl --physcpubind" on Linux systems).  


  [1]: https://software.intel.com/en-us/forums/software-tuning-performance-optimization-platform-monitoring/topic/744272
