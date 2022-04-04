---
layout:       post
title:        >
    How to have script detect if terminal emulator is running in a desktop session or not?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1039023
type:         Answer
tags:         scripts desktop-environments virtual-console
created_date: 2018-05-22 12:05:03
edit_date:    2018-05-22 12:25:26
votes:        "3 "
favorites:    
views:        "981 "
accepted:     
uploaded:     2022-04-03 19:52:48
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-22-How-to-have-script-detect-if-terminal-emulator-is-running-in-a-desktop-session-or-not_.md
toc:          false
navigation:   false
clipboard:    false
---

This is what I've been using:



``` bash
# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    notify-send --urgency=critical "$0 cannot be run from GUI without TERM environment variable."
    exit 1
fi
```

The reason for this code was this question: [Desktop shortcut to Bash script crashes and burns][1]

You can modify it to look like this:

``` bash
# $TERM variable may be missing when called via desktop shortcut
CurrentTERM=$(env | grep TERM)
if [[ $CurrentTERM == "" ]] ; then
    nano ...
else
    gedit ...
fi
```


  [1]: {% post_url /2018/2018-03-26-Desktop-shortcut-to-Bash-script-crashes-and-burns %}
