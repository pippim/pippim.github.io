---
layout:       post
title:        How do I create a fake process bar?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027622
type:         Answer
tags:         command-line yad
created_date: 2018-04-23 23:29:17
edit_date:    2020-06-12 14:37:07
votes:        3
favorites:    
views:        2,375
accepted:     
uploaded:     2021-12-28 15:43:52
toc:          false
navigation:   false
clipboard:    true
---

## Fake Progress Bar

This progress bar uses real data in `/bin` directory which everyone has. The script can be "dumbed down" to suit your fake needs. Or it can be expanded for a real life application:

[![yad-progress-bar.gif][1]][1]

It uses `yad` which is a super-charged version of `zenity` the default GUI used in the terminal. To install `yad` use:

``` 
sudo apt install yad

```

Here's the code:



{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: yad-progress-bar
# PATH: /mnt/e/bin
# DESC: Display yad progress bar % with names.
# DATE: Apr 23, 2018.  Modified Oct 18, 2019.

Source="/bin"
Title="Processing files for: $Source"
Count=0  
AllFiles=$(ls $Source/* | wc -l)

for f in "$Source"/* ; do

    echo "#$f"              # Display file name in progress bar.
    Count=$(( $Count + 1 ))
    Percent=$(( Count * 100 / AllFiles ))
    echo $Percent           # Display percent complete in progress bar.
    sleep .025

done | yad --progress       --auto-close \
    --width=500             --height=300 \
    --title="$Title"        --enable-log "Current filename" \
    --log-expanded          --log-height=250 \
    --log-on-top            --percentage=0 \
    --no-cancel             --center

```


  [1]: https://i.stack.imgur.com/NRp3o.gif
