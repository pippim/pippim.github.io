---
layout:       post
title:        Is there an efficiency hit for a constant formula in a C #define?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/53816917
type:         Question
tags:         c c-preprocessor
created_date: 2018-12-17 14:07:21
edit_date:    2018-12-17 15:50:03
votes:        -2
favorites:    
views:        99
accepted:     Accepted
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    false
---

I was perusing some kernel source code from `cpufreq_governor.h` and saw this: 

``` 
/*
 * The polling frequency depends on the capability of the processor. Default
 * polling frequency is 1000 times the transition latency of the processor. The
 * governor will work on any processor with transition latency <= 10ms, using
 * appropriate sampling rate.
 *
 * For CPUs with transition latency > 10ms (mostly drivers with CPUFREQ_ETERNAL)
 * this governor will not work. All times here are in us (micro seconds).
 */
#define MIN_SAMPLING_RATE_RATIO			(2)
#define LATENCY_MULTIPLIER			(1000)
#define MIN_LATENCY_MULTIPLIER			(20)
#define TRANSITION_LATENCY_LIMIT		(10 * 1000 * 1000)

```

Would it not be more efficient to change the last line to read:

``` 
#define TRANSITION_LATENCY_LIMIT		(10000000) /* (10 * 1000 * 1000) */

```

