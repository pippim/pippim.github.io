---
layout:       post
title:        >
    Weather from terminal
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035779
type:         Answer
tags:         command-line
created_date: !!str "2018-05-13 17:23:31"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "118,075"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
toc:          false
navigation:   false
clipboard:    false
---

You can compare cities using:

``` 
diff -Naur <(curl -s http://wttr.in/london ) <(curl -s http://wttr.in/new-york )

```

as illustrated in the top-voted answer. `wttr.in` also makes a great "splash" screen every time you open the terminal. Do this by adding it to your `~/.bashrc` file. I've done that to include Weather, Date, Time and Distribution information as detailed in this answer: https://askubuntu.com/questions/1020692/how-can-i-get-this-terminal-splash-screen

[![Bash Splash in Windows 10.png][1]][1]

Sorry I was in Ubuntu in Windows 10 WSL for Spring 2018 updates when I captured this image. Promise I'll boot back into Ubuntu in Linux soon.


  [1]: https://i.stack.imgur.com/bhjyD.png
