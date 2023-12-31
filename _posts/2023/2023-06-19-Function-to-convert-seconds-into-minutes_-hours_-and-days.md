---
layout:       post
title:        >
    Function to convert seconds into minutes, hours, and days
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/76503231
type:         Answer
tags:         python
created_date: 2023-06-19 02:05:56
edit_date:    
votes:        "1 "
favorites:    
views:        "257,928 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2023/2023-06-19-Function-to-convert-seconds-into-minutes_-hours_-and-days.md
toc:          false
navigation:   false
clipboard:    false
---

I converted screenfetch code from bash to python:

```python
def days(seconds):
    tim = int(seconds)
    m = tim / 60 % 60
    h = tim / 3600 % 24
    d = tim / 86400
    r = str(m) + " min"
    if h > 0: r = str(h) + " hr, " + r
    if d > 0: r = str(d) + " day, " + r
    return r


print(days(86772))
print(days(123456))
```

Output:

``` shell
1 day, 6 min
1 day, 10 hr, 17 min
```

Many answers don't show output which makes it hard to choose which answer you want to use.
