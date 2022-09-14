---
layout:       post
title:        >
    What does the -tulpn option mean for netstat?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1217526
type:         Answer
tags:         netstat
created_date: 2020-03-16 10:36:01
edit_date:    2020-03-16 10:48:00
votes:        "4 "
favorites:    
views:        "23,502 "
accepted:     
uploaded:     2022-09-14 04:35:44
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-03-16-What-does-the-tulpn-option-mean-for-netstat_.md
toc:          false
navigation:   false
clipboard:    false
---

In addition to `man netstat` you can type `info netstat` to get a shorter summary and longer explanation:

``` 
NETSTAT(8)                      Linux Programmer's Manual                      NETSTAT(8)

NAME
       netstat  -  Print  network connections, routing tables, interface statistics, mas‐
       querade connections, and multicast memberships

SYNOPSIS
       netstat [address_family_options] [--tcp|-t] [--udp|-u] [--raw|-w] [--listening|-l]
       [--all|-a]  [--numeric|-n]  [--numeric-hosts]  [--numeric-ports] [--numeric-users]
       [--symbolic|-N] [--extend|-e[--extend|-e]]  [--timers|-o]  [--program|-p]  [--ver‐
       bose|-v] [--continuous|-c]

```

For `-t -u -l -p -n` above you see `--tcp`, `--udp`, `--listen`, `--program` and `--numeric` without having to scroll.

Scrolling down you can see verbose explanations.
