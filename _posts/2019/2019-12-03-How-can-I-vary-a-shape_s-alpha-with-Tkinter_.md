---
layout:       post
title:        >
    How can I vary a shape's alpha with Tkinter?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59149180
type:         Answer
tags:         python tkinter alpha
created_date: 2019-12-03 01:59:50
edit_date:    
votes:        "0 "
favorites:    
views:        "12,960 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-03-How-can-I-vary-a-shape_s-alpha-with-Tkinter_.md
toc:          false
navigation:   false
clipboard:    false
---

You can't change the alpha but you can get simulated transparency with the `stipple` option in regular `tkinter`. For example using:

``` 
mycanvas.create_rectangle(X1, Y1, X2, Y2, fill=color, stipple="gray50")
```

yields:

[![resize1.png][1]][1]


  [1]: https://i.stack.imgur.com/JWqj7.png
