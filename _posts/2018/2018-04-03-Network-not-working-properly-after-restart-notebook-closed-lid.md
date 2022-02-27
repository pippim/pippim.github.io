---
layout:       post
title:        >
    Network not working properly after restart notebook closed lid
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021563
type:         Answer
tags:         16.04 networking suspend laptop
created_date: 2018-04-03 10:33:21
edit_date:    2020-06-12 14:37:07
votes:        "0 "
favorites:    
views:        "135 "
accepted:     Accepted
uploaded:     2022-02-27 06:57:25
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-03-Network-not-working-properly-after-restart-notebook-closed-lid.md
toc:          false
navigation:   false
clipboard:    false
---

Go to **Settings** -> **Power** and set this screen as follows:

[![Power lid closed][1]][1]

Change **When the lid is closed** from `Suspend` to `Do nothing`.


----------

## When not logged in

Run this command:

``` 
$ cat /etc/systemd/logind.conf | grep LidSwitch

#HandleLidSwitch=ignore
#HandleLidSwitchDocked=ignore
#LidSwitchIgnoreInhibited=yes
```

Systemd could be suspending the laptop when not signed into Ubuntu.

  [1]: https://i.stack.imgur.com/FuGkr.png
