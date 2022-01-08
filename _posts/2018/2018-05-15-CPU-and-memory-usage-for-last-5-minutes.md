---
layout:       post
title:        >
    CPU and memory usage for last 5 minutes
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1036501
type:         Answer
tags:         16.04
created_date: 2018-05-15 11:52:58
edit_date:    
votes:        "1 "
favorites:    
views:        "2,064 "
accepted:     Accepted
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

The `uptime` command lists load average for the last 1, 5 and 15 minutes:

``` 
$ uptime
 05:49:47 up  8:40,  1 user,  load average: 3.38, 2.16, 1.87

```

The load needs to be divided by number of CPUs. For example my system is a quad core (4 CPUs) Hyper threading (2 threads per CPU) so I need to divide by 8. The 5 minute load average of 2.16 is really .27 or about 27%.

You can learn more [here][1] and [here][2].


  [1]: http://blog.scoutapp.com/articles/2009/07/31/understanding-load-averages
  [2]: http://www.brendangregg.com/blog/2017-08-08/linux-load-averages.html
