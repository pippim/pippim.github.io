---
layout:       post
title:        >
    Python merge three lines of .split() into one line?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63964383
type:         Question
tags:         python split
created_date: !!str "2020-09-19 01:14:33"
edit_date:    !!str "2020-09-19 01:58:36"
votes:        !!str "0"
favorites:    
views:        !!str "54"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    true
---

I have this code where I'm hoping the three split commands can be combined into a single line but I can't figure out how:

{% include copyHeader.html %}
``` 
from __future__ import print_function       # Must be first import
import subprocess32 as sp

def get_mouse_coordinates():
    ''' Get mouse co-ordinates with xdotool:
            $ xdotool getmouselocation
            x:4490 y:1920 screen:0 window:65011722
    '''
    command_line_list = ['xdotool', 'getmouselocation']

    pipe = sp.Popen(command_line_list, stdout=sp.PIPE, stderr=sp.PIPE)
    text, err = pipe.communicate()              # This performs .wait() too

    print("returncode of subprocess:",pipe.returncode)

    if text:
        x, y, z = text.split(' ',2)             # Grab 'x:9999' 'y:9999' 'junk'
        x_ret = x.split(':')[1]                 # Grab right of 'x:9999'
        y_ret = y.split(':')[1]                 # Grab right of 'y:9999'

        print("standard output of subprocess:")
        print(text,'x-offset:',x_ret,'y-offset:',y_ret)
        return x_ret, y_ret

    if err:
        print("standard error of subprocess:")
        print(err)
        return 100, 100
```

Probably blatantly obvious but these are the three lines of code:

``` 
x, y, z = text.split(' ',2)             # Grab 'x:9999' 'y:9999' 'junk'
x_ret = x.split(':')[1]                 # Grab right of 'x:9999'
y_ret = y.split(':')[1]                 # Grab right of 'y:9999'
```

If you are curious, output in terminal:

``` 
returncode of subprocess: 0
standard output of subprocess:
x:3400 y:558 screen:0 window:23073340
 x-offset: 3400 y-offset: 558
```
