---
layout:       post
title:        >
    Quickly total and average a column of numbers in terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1530791
type:         Answer
tags:         command-line text-processing
created_date: 2024-10-22 02:06:45
edit_date:    2025-02-21 01:54:49
votes:        "4 "
favorites:    
views:        "944 "
accepted:     Accepted
uploaded:     2025-05-24 22:53:28
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2024/2024-10-22-Quickly-total-and-average-a-column-of-numbers-in-terminal.md
toc:          false
navigation:   false
clipboard:    false
---

### 1. Copy the column of numbers using rectangle

Hold down the <kbd>Ctrl</kbd> key and Left mouse button and drag the mouse to highlight the column of numbers:

[![enter image description here][1]][1]

**NOTE:** As soon as you highlight the rectangle it is copied to the clipboard.

---

### 2. Run the program `n`

Then type `n` + <kbd>Enter</kbd>.

[![enter image description here][2]][2]

Use the middle-mouse button to paste from the clipboard. Then press <kbd>Enter</kbd> to tally the results.

---

### 3. Install `n` on your system

The `n` program is a simple python script:

``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Author: pippim.com
License: GNU GPLv3. (c) 2024
Source: This repository
Description: n - Count, Total, Minimum, Maximum and Average set of numbers.
"""

from __future__ import print_function  # Must be first import
from __future__ import with_statement  # Error handling for file opens
import warnings  # 'warnings' advises which commands aren't supported

print("n - Count, Total, Minimum, Maximum and Average set of numbers.")
print("Paste or input values ('x' + <Enter> to finish):")

n = ""  # Number entered
nl = []  # Number list

while n != 'x':  # Loop until 'x' entered
    try:
        n = input()  # Python 3.x
    except (SyntaxError, NameError):
        n = raw_input()  # Python 2.7.12
    try:
        nl.append(float(n))
    except ValueError:
        break  # A letter was entered

print()
if len(nl) == 0:
    print("Nothing to do. Goodbye.")
    exit()

print("Cnt:", len(nl))
print("Tot:", sum(nl))
print("Min:", min(nl))
print("Max:", max(nl))
print("Avg:", sum(nl) / len(nl))

```

Copy the above python script to a file named `n`. The `n` file should be in your path. If not in your path you must call it with the directory prefix. For example you would have to type `/home/me/stuff/n` instead of just `n`.

You need to flag the `n` program as executable. For example `chmod a+x /home/me/stuff/n`.

---

### 4. Summary

`n` will take numbers copied not just from `gnome-terminal` but also from Libre Calc, pyCharm and many other programs that can copy to the system clipboard.

Having to add up or calculate the average for a set of numbers has been a PITA for a long time for me. So I whipped up this little script in just a few minutes. Writing this Q & A actually took longer :)

`n` should run on any Python version from `2.7.12` to `3.14` or in other words Ubuntu 16.04 through Ubuntu 24.10.

### Other Answers

There are other great answers specifically tailored to the question but are not robust. For example another program displays output of WiFi speed from Linux to Android 13 phone:

[![enter image description here][3]][3]

The `n` python program still works without any tweaking of `awk` print positions. Additionally, for myself anyway, `awk` is frankly *awkward* to remember the syntax and arguments. Making a script and constantly revising it based on column position doesn't speed up the workflow.


---

## 5. `homa.py` as of February 20, 2025

Here is what `homa.py` CLI output looks like today:

``` shell
$ homa.py

  ######################################################
 //////////////                            \\\\\\\\\\\\\\
<<<<<<<<<<<<<<    HomA - Home Automation    >>>>>>>>>>>>>>
 \\\\\\\\\\\\\\                            //////////////
  ######################################################
                    Started: 4:06 PM

= = = = = System Monitor Processor Temps & Fans = = = = =
 Seconds | CPU Temp Fan RPM | GPU Temp Fan RPM |   Time  
-------- | ---------------- | ---------------- | --------
   10.45 |  78.0°C 5200 RPM |  78.0°C 5000 RPM |  4:06 PM
 1102.53 |  69.0°C 5000 RPM |  72.0°C 4600 RPM |  4:24 PM
 1105.02 |  68.0°C 4900 RPM |  72.0°C 4300 RPM |  4:24 PM
 1108.47 |  68.0°C 4600 RPM |  72.0°C 4300 RPM |  4:25 PM
 4708.54 |  69.0°C 4500 RPM |  70.0°C 4300 RPM |  5:25 PM
 8309.39 |  69.0°C 4500 RPM |  73.0°C 4300 RPM |  6:25 PM
 8514.30 |  87.0°C 4800 RPM |  82.0°C 4600 RPM |  6:28 PM
 8516.54 |  85.0°C 5000 RPM |  82.0°C 4900 RPM |  6:28 PM
```

The advantage of `n` is you can select any column and tally the results. There are many great answers on how `awk` can tally the last column, or with a few minor script changes you can instruct `awk` to look at a different column. The spirit of this self-answered question though was to promote `n` to copy and paste any column without any programming changes.

Here is a snippet of the `homa.py` GUI for those that are still reading this far:

[![HomA rediscover now][4]][4]


  [1]: https://pippim.github.io/assets/img/posts/2024/UmZ1kQXE.png
  [2]: https://pippim.github.io/assets/img/posts/2024/lQKxfrA9.png
  [3]: https://pippim.github.io/assets/img/posts/2024/AfKHiY8J.png
  [4]: https://pippim.github.io/assets/img/posts/2024/65LFa46B.gif
