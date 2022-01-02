---
layout:       post
title:        >
    What's eating all the RAM and swap?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/845020
type:         Answer
tags:         games swap 16.10
created_date: 2016-11-03 10:19:56
edit_date:    2020-06-12 14:37:07
votes:        "1 "
favorites:    
views:        "363 "
accepted:     Accepted
uploaded:     2022-01-02 16:07:48
toc:          false
navigation:   false
clipboard:    false
---

# Chrome can use a lot of RAM

When Chrome window has focus press <kbd>Shift</kbd>>+<kbd>Esc</kbd> to bring up process manager:

[![enter image description here][1]][1]

I've ententionally narrowed the Task name width to hide my gmail inbox name but you can see it is using over 400 MB of RAM. In this screen Chrome is using **1.7 GB** of RAM simply surfing the net with 10 Tabs opened.

Your screen only shows the `Chrome` name but this screen shows each opened `Tab` name to track down the offender. In my case if I wanted to free up RAM I would close `gamil.com`. 

The second large RAM user is `Earth-Sunrise` website that has a comment section. Some websites with comment sections can burn up lots of RAM, in testing over 1 GB per tab over a few hours. Simpy refreshing the Tab brings the usage back down to ~100 MB.

# Display JAVA Memory Usage

The tool VisualVM will display Java memory usage and other information:

[![Java RAM Usage][2]][2]

You can download it from github: ([VisualVM][3])


  [1]: https://i.stack.imgur.com/tIbep.png
  [2]: https://i.stack.imgur.com/ySuQ6.png
  [3]: https://visualvm.github.io/
