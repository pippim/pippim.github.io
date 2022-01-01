---
layout:       post
title:        >
    How to get artwork into Tkinter Image using eyed3?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63144242
type:         Question
tags:         python tkinter eyed3
created_date: !!str "2020-07-28 23:30:47"
edit_date:    !!str ""
votes:        !!str "0"
favorites:    
views:        !!str "189"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

Similar to this question:

- https://stackoverflow.com/questions/29702179/how-to-get-detail-title-artist-from-mp3-files-in-python-using-eyed3

I'd like to get music artwork from a `.m4a` file (similar to `.mp3') into Tkinter Image for displaying on a label.

For some strange reason all the answers in the link use:

``` 
import eyed3

```

but I have to use

``` 
import eyeD3

```

to install I had to use:

``` 
sudo apt install python-eyed3
sudo apt install eyed3

```

I'm running Ubuntu 16.04.6 LTS until 2021 at the latest which means I'm using Python 2.7.12. I understand the syntax and naming conventions may have changed in `eyeD3` or `eyed3` Python 3.5 versions which is another option for Ubuntu 16.04.6 LTS. I'm also using Linux Kernel `4.14.188` LTS but I doubt that matters.

**Note:** I tried `ffmpeg` calls from Python this morning to convert `.m4a` file's artwork into a `.jpg` file but that was "complicated" and I was hoping `eyed3` or `eyeD3` would be simpler.
