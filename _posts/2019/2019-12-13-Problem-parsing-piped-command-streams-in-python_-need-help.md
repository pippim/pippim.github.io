---
layout:       post
title:        >
    Problem parsing piped command streams in python, need help
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1195775
type:         Answer
tags:         bash python
created_date: 2019-12-13 00:06:06
edit_date:    
votes:        "1 "
favorites:    
views:        "110 "
accepted:     Accepted
uploaded:     2022-01-29 14:37:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-13-Problem-parsing-piped-command-streams-in-python_-need-help.md
toc:          false
navigation:   false
clipboard:    false
---

I'm in the same boat sailing from Bash Basin to Python Peninsula. I had to use a series of `xrandr` and `wmctrl` commands piped through `grep` for my inaugural project (still on-going *sigh*). Your solution would be:

<!-- Language-all: lang-python -->

<pre><code>$ sensors | grep Core
<b>Core</b> 0:        +47.0°C  (high = +100.0°C, crit = +100.0°C)
<b>Core</b> 1:        +49.0°C  (high = +100.0°C, crit = +100.0°C)
<b>Core</b> 2:        +45.0°C  (high = +100.0°C, crit = +100.0°C)
<b>Core</b> 3:        +47.0°C  (high = +100.0°C, crit = +100.0°C)
</code></pre>

``` 
$ sensors.py
49
51
47
48
```

Here's your script:

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
list_cores = os.popen("sensors | grep Core").read().splitlines()

for l in list_cores:

    # Core 0:        +47.0°C  (high = +100.0°C, crit = +100.0°C)  <---- sample
    #                ^  ^
    #                |  |
    #                |  +---- 2md split on decimal take [0] element (b list)
    #                +------- 1st aplit on plus sign take [1] element (a list)

    a = l.split("+") 
    b = a[1].split(".")
    c = b[0]
    print (c)
```

Mark as executable before running: `chmod a+x sensors.py`

Happy to answer any questions :)
