---
layout:       post
title:        >
    How to Switch Focus to a Gnome Terminal Tab via Script or Shell Command
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/55762022
type:         Answer
tags:         bash ubuntu gnome-terminal xdotool wmctrl
created_date: !!str "2019-04-19 12:41:11"
edit_date:    !!str ""
votes:        !!str "3"
favorites:    
views:        !!str "1,652"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
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

