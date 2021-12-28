---
layout:       post
title:        Turning off text highlighting
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/880269
type:         Answer
tags:         bash
created_date: 2017-02-06 02:16:28
edit_date:    
votes:        2
favorites:    
views:        5,605
accepted:     
uploaded:     2021-12-28 13:55:01
toc:          false
navigation:   false
clipboard:    true
---

`ll` is an alias defined in `~/.bashrc` along with other alias's that use color:

{% include copyHeader.html %}
``` 
# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Add an "alert" alias for long running commands.  Use like so:
#   sleep 10; alert
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

# Add a "redalert" alias to pop-up on GUI desktop screens.  Use like so:
#   redalert "Weather update: It's raining Red States"
alias redalert='notify-send --urgency=critical -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'

```

The last **Alias**: ***redalert*** I added manually and is not in normal Ubuntu distributions.

What you can do if you want no colors is use:

``` 
sudo chmod -x /usr/bin/dircolors

```

However in your case you might be looking at a windows partition, ie:

[![windows directory][1]][1]

In which case you can simply use `\ls -alF` for no colors:

[![ls no colors][2]][2]


  [1]: https://i.stack.imgur.com/V2yVs.png
  [2]: https://i.stack.imgur.com/qX0vU.png
