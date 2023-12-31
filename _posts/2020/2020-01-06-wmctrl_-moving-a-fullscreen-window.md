---
layout:       post
title:        >
    wmctrl: moving a fullscreen window
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59617017
type:         Answer
tags:         linux bash shell scripting wmctrl
created_date: 2020-01-06 18:19:35
edit_date:    
votes:        "1 "
favorites:    
views:        "2,318 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-01-06-wmctrl_-moving-a-fullscreen-window.md
toc:          false
navigation:   false
clipboard:    false
---

From [Ask Ubuntu](https://askubuntu.com/posts/1086024)



I've rewrited @jacobs python code to simple bash and make it works (I tested this on ubuntu 16 cinnamon).

I had to add `remove,maximized_vert, remove,maximized_horz` without that windows didn't move.

   
``` bash
#!/bin/bash
   
if [ ! -z "$1" ] || [ -z "$2" ]; then
    command=$(wmctrl -l | grep $1 | cut -d" " -f1)
   
    if [ ! -z "$command" ]; then
        position=$(xrandr | grep "^$2" | cut -d"+" -f2)
   
        if [ ! -z "$position" ]; then
            for window in $command; do
               wmctrl -ir $window -b remove,maximized_vert
               wmctrl -ir $window -b remove,maximized_horz
               wmctrl -ir $window -e 0,$position,0,1920,1080
               wmctrl -ir $window -b add,maximized_vert
               wmctrl -ir $window -b add,maximized_horz
            done
        else
            echo -e "not found monitor with given name"
        fi
    else
        echo -e "not found windows with given name"
    fi
else
    echo -e "specify window and monitor name;\nmove.sh window-name monitor-name"
fi
```

1. `sudo apt-get install xdotool wmctrl`
2. `/path/to/script.sh "window-name" "monitor-name"`

 
