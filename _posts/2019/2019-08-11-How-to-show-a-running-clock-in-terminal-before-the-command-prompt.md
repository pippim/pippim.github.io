---
layout:       post
title:        >
    How to show a running clock in terminal before the command prompt
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1164893
type:         Answer
tags:         command-line gnome-terminal
created_date: 2019-08-11 03:56:51
edit_date:    
votes:        "2 "
favorites:    
views:        "0 "
accepted:     
uploaded:     2024-08-11 16:59:15
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-08-11-How-to-show-a-running-clock-in-terminal-before-the-command-prompt.md
toc:          false
navigation:   false
clipboard:    false
---

If you never need to use `debian_chroot` then it's a handy place to put the time the command prompt was displayed by using:

``` 
export PROMPT_COMMAND='debian_chroot=$(date +%r)'
```

Type this in your terminal and watch your command prompt change with the time:

``` 
rick@alien:~$ export PROMPT_COMMAND='debian_chroot=$(date +%r)'

(09:14:59 PM)rick@alien:~$ 
```

After the time is set once, to get a running clock which updates every second use:

``` 
while sleep 1;do tput sc;tput cup $(($(tput lines)-1)) 1;printf `date +%r`;tput rc;done &
```

This `.gif` shows the commands in action:

[![Time terminal prompt.gif][1]][1]


  [1]: https://pippim.github.io/assets/img/posts/2019/QuLC2.gif
