---
layout:       post
title:        >
    Python convert named string fields to tuple
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59726703
type:         Question
tags:         python tuples
created_date: !!str "2020-01-14 02:21:56"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "53"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

Similar to this question: https://stackoverflow.com/questions/34809173/tuple-declaration-in-python

I have this function:

``` 
def get_mouse():
    # Get: x:4631 y:506 screen:0 window:63557060
    mouse = os.popen( "xdotool getmouselocation" ).read().splitlines()
    print mouse
    return mouse
```

When I run it it prints:

``` 
['x:2403 y:368 screen:0 window:60817757']

```

I can split the line and create 4 separate fields in a list but from Python code examples I've seen I feel there is a better way of doing it. I'm thinking something like `x:=` or `window:=`, etc.

I'm not sure how to properly define these "named tuple fields" nor how to reference them in subsequent commands?

I'd like to read more on the whole subject if there is a reference link handy.
