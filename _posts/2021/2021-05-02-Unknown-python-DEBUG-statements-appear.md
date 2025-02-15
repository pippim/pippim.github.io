---
layout:       post
title:        >
    Unknown python DEBUG statements appear
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67352300
type:         Answer
tags:         python logging
created_date: 2021-05-02 01:40:30
edit_date:    
votes:        "5 "
favorites:    
views:        "1,043 "
accepted:     Accepted
uploaded:     2025-02-15 14:36:50
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-05-02-Unknown-python-DEBUG-statements-appear.md
toc:          false
navigation:   false
clipboard:    false
---

Turns out it's a [glitch](https://github.com/camptocamp/pytest-odoo/issues/15) in tkinter's pillow (PIL).

The solution is a simple one-liner after the import:

``` python
import logging
logging.getLogger('PIL').setLevel(logging.WARNING)
```
