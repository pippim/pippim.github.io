---
layout:       post
title:        >
    How to Switch Focus to a Gnome Terminal Tab via Script or Shell Command
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/55762022
type:         Answer
tags:         bash ubuntu gnome-terminal xdotool wmctrl
created_date: 2019-04-19 12:41:11
edit_date:    
votes:        "3 "
favorites:    
views:        "1,708 "
accepted:     
uploaded:     2022-01-09 09:38:39
toc:          false
navigation:   false
clipboard:    false
---

In order to send the signal from Bash Shell use `xdotool`:

``` 
sudo apt install xdotool

```

In your script issue this command:

``` 
xdotool key Control+Page_Up

```

