---
layout:       post
title:        >
    How to parse and search a list of inter-dependent strings?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63429034
type:         Answer
tags:         python list search
created_date: 2020-08-15 17:39:04
edit_date:    
votes:        "1 "
favorites:    
views:        "143 "
accepted:     Accepted
uploaded:     2022-01-07 19:17:03
toc:          false
navigation:   false
clipboard:    true
---

I'll answer my own question in case it helps others.

This is the function I wrote which returns original requirements plus current volume:

{% include copyHeader.html %}
``` 
def sink_master():
    all_lines = []
    all_lines = os.popen('pactl list sink-inputs').read().splitlines()

    all_sinks = []
    in_sink = False
    in_volume = False
    for line in all_lines:
        if in_sink is False and "Sink Input #" in line:
            this_sink = line.split('#')[1]
            in_sink = True
            continue
        if in_sink is True and in_volume is False and "Volume:" in line:
            this_volume = line.split('/')[1]
            this_volume = this_volume.replace(' ','')
            this_volume = this_volume.replace('%','')
            in_volume = True
            continue
        if in_sink is True and in_volume is True and "tion.name =" in line:
            this_name = line.split('=')[1]
            this_name = this_name.replace(' ','')
            this_name = this_name.replace('"','')
            in_sink = False
            in_volume = False
            all_sinks.append(tuple((this_sink,this_volume,this_name)))
            continue

    print(all_sinks)
    return all_sinks
```

When you run it it returns a list of tuples:

``` 
[('1828', '100', 'Firefox'), ('1891', '50', 'ffplay'), ('1907', '100', 'ffplay')]

```

Each tuple contains:

1. Input Sink # used by `pulseaudio` (respected by `ffplay`)
2. Current volume (with spaces and `%` stripped)
3. Application name (with double quotes `"` stripped)
