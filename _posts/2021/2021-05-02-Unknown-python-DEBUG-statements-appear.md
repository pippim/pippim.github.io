---
layout:       post
title:        >
    Unknown python DEBUG statements appear
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67352300
type:         Answer
tags:         python logging
created_date: !!str "2021-05-02 01:40:30"
edit_date:    !!str ""
votes:        !!str "1"
favorites:    
views:        !!str "33"
accepted:     Accepted
uploaded:     !!str "2021-12-31 14:57:34"
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
