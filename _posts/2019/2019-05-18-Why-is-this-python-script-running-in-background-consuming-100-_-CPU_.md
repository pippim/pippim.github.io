---
layout:       post
title:        >
    Why is this python script running in background consuming 100 % CPU?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1144385
type:         Answer
tags:         scripts python clipboard
created_date: 2019-05-18 23:26:18
edit_date:    
votes:        "4 "
favorites:    
views:        "22,127 "
accepted:     
uploaded:     2022-02-13 07:46:52
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-05-18-Why-is-this-python-script-running-in-background-consuming-100-_-CPU_.md
toc:          false
navigation:   false
clipboard:    false
---

I was intrigued by this project so wrote a bash script for those more comfortable in that environment:

``` bash
#!/bin/bash

xclip -o -sel clip > /tmp/LastClip

while true ; do 

    xclip -o -sel clip > /tmp/NewClip
    diff -q /tmp/LastClip /tmp/NewClip > /tmp/DiffClip
    if [[ -s /tmp/DiffClip ]] ; then
        cat /tmp/NewClip    # For testing dump to screen instead of printing
        cp -a /tmp/NewClip /tmp/LastClip
    fi
    sleep 1.0
    
done
```

It does require Xorg's `xclip` package:

``` 
sudo apt install xclip
```

It's dumping clipboard contents to screen using `cat` command. If you want hard copy instead replace `cat` with `lp` and specify your printer name, orientation and possibly "fit to page" option.

You will see a bit of lag to screen because I choose `sleep 1.0` which would be unnoticeable with a printer and still faster than people can highlight text and use <kbd>Ctrl</kbd>+<kbd>C</kbd>.

If you copy the exact same highlighted text to the clipboard it doesn't trigger a difference. One letter more or less will trigger a response.
