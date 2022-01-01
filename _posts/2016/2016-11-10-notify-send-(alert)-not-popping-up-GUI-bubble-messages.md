---
layout:       post
title:        >
    notify-send (alert) not popping-up GUI bubble messages
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/847624
type:         Answer
tags:         notification bashrc
created_date: !!str "2016-11-10 00:24:16"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "3"
favorites:    
views:        !!str "1,441"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

# Aliases are automatically created in ~/.bashrc

When you look in ~/.bashrc you see these lines:

``` 
# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

```

The problem with the code is the `--urgency=low` flag. Sometimes the message pops up, some times it doesn't. After all it is low priority right?

To make the message always appear set the urgency to `critical`. Rather than changing the system default I created a new line for my own purposes:

``` 
# Add a "redalert" alias to pop-up on GUI desktop screens.  Use like so:
#   redalert "Weather update: It's raining Red States"
alias redalert='notify-send --urgency=critical -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

```

Now you can use:

``` 
redalert "Weather Update: It's raining Red States"

```

and it works perfectly!
