---
layout:       post
title:        >
    Tkinter horizontal scrollbar too narrow
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59507304
type:         Answer
tags:         python tkinter scrollbar
created_date: !!str "2019-12-28 00:49:11"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "380"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

Write this problem off to education and the perils of lifting someone else's code without fulling understanding it at first.

## Scrollbar too narrow

The first problem of the horizontal scrollbar being too narrow was solved by changing this line:

``` 
hsbar.pack(side=BOTTOM, fill=Y, expand=False)

```

to this:

``` 
hsbar.pack(side=BOTTOM, fill=X, expand=False)

```

The `fill` argument tells tkinter which axis to fill on. `Y` is y-axis and `X` is x-axis (horizontal).

## Scrollbar doesn't appear until scrolling down

The second problem was caused by these two lines:

``` 
Frame.__init__(self, frame)

```

The problem was solved by changing it to:

``` 
Frame.__init__(self, self.canvas)

As [Stovfl's comment][1] states:
```


> The `Frame `is a child of the `Canvas`, therefore the `Canvas` has to  
> be passed as parent.  


  [1]: {% post_url /2019/2019-12-28-Tkinter-horizontal-scrollbar-too-narrow %}
