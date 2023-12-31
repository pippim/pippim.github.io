---
layout:       post
title:        >
    Text formatting error: '=' alignment not allowed in string format specifier
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/76917919
type:         Answer
tags:         python string-formatting
created_date: 2023-08-17 01:19:12
edit_date:    
votes:        "-1 "
favorites:    
views:        "42,149 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2023/2023-08-17-Text-formatting-error_-___-alignment-not-allowed-in-string-format-specifier.md
toc:          false
navigation:   false
clipboard:    false
---

Just for others who google searched and found this Q&A.

This error:

``` shell
    out_name = track_name_fmt.format(track, song)
ValueError: '=' alignment not allowed in string format specifier
```

Was fixed by using:

``` python
out_name = track_name_fmt.format(int(track), song)
```

Forcing `track` to integer solved the problem.
