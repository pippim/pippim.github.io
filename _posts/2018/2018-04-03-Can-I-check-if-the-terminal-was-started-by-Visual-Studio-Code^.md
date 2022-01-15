---
layout:       post
title:        >
    Can I check if the terminal was started by Visual Studio Code?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1021556
type:         Answer
tags:         command-line visual-studio-code
created_date: 2018-04-03 10:13:51
edit_date:    
votes:        "2 "
favorites:    
views:        "1,360 "
accepted:     
uploaded:     2022-01-14 19:59:53
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-03-Can-I-check-if-the-terminal-was-started-by-Visual-Studio-Code^.md
toc:          false
navigation:   false
clipboard:    false
---

Using this potentially duplicate answer: [https://askubuntu.com/a/1012277/307523][1]

``` 
rick@alien:~$ echo $$
25119
───────────────────────────────────────────────────────────────────────────────────────────
rick@alien:~$ pstree -aps $$
systemd,1 splash fastboot kaslr
  └─lightdm,1026
      └─lightdm,1294 --session-child 12 19
          └─upstart,1838 --user
              └─gnome-terminal-,25109
                  └─bash,25119
                      └─pstree,5696 -aps 25119

```

The environment variable `$$` returns the current running processes PID (Process ID) which is the bash terminal.

The `pstree` command shows the entire "tree" of commands called.

  [1]: https://askubuntu.com/a/1012277/307523
