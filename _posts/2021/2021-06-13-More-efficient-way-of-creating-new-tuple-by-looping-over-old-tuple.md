---
layout:       post
title:        >
    More efficient way of creating new tuple by looping over old tuple
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/67963375
type:         Question
tags:         python tuples generator
created_date: !!str "2021-06-13 23:30:41"
edit_date:    !!str "2021-06-14 00:30:03"
votes:        !!str "0"
favorites:    
views:        !!str "50"
accepted:     Accepted
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

I've managed to adjust color when cursor hovers over a tkinter canvas rounded rectangle button using this:

``` python
def shade_rgb(rgb):
    """ Adjust shade of rgb by 25% (value 64 out of 256)
        :param rgb: tuple of red, green, blue integers 0 to 255
        :returns:   tuple of red, green, blue integers 0 to 255
    """
    converted = []
    for i in rgb:
        if i < 128:
            i = i + 64
        else:
            i = i - 64
        converted.append(i)
    return tuple(converted)
```

I've seen code of list comprehension and tuple generators which I believe would shorten the code considerably. However I can "comprehend" how to make that work?


----------


## Reply to comment

*"Where did you get stuck?"*

My attempt at generator was something like this:

``` 
return tuple(i = i + 64 if i<128 else i = i - 64 for i in rgb)

```

Usually in Python I would use:

``` 
i = i + 64

```

or:

``` 
i += 64

```

But apparently within a generators you enter an alternate universe and the rules of physics change to:

``` 
i + 64

```

