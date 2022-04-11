---
layout:       post
title:        >
    What's the shell session?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1026071
type:         Answer
tags:         command-line bash tty
created_date: 2018-04-18 10:13:44
edit_date:    
votes:        "2 "
favorites:    
views:        "7,346 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-18-What_s-the-shell-session_.md
toc:          false
navigation:   false
clipboard:    false
---

To see your current shell along with it's process ID, the process ID of parents and the process ID of current command use:

``` 
$ pstree -aps $$
systemd,1 splash fastboot kaslr
  └─lightdm,1050
      └─lightdm,1294 --session-child 12 19
          └─upstart,1883 --user
              └─gnome-terminal-,10481
                  └─bash,3612
                      └─pstree,15684 -aps 3612
```


- `$$` is the environment variable for the shell's process ID (3612).
