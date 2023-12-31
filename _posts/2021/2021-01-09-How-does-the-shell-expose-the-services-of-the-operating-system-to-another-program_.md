---
layout:       post
title:        >
    How does the shell expose the services of the operating system to another program?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1306421
type:         Answer
tags:         command-line
created_date: 2021-01-09 11:51:11
edit_date:    
votes:        "0 "
favorites:    
views:        "166 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2021/2021-01-09-How-does-the-shell-expose-the-services-of-the-operating-system-to-another-program_.md
toc:          false
navigation:   false
clipboard:    false
---

From the terminal type `set` and you will see:

``` 
BASH=/bin/bash
BASHOPTS=checkwinsize:cmdhist:complete_fullquote:expand_aliases:extglob:extquote:force_fignore:histappend:interactive_comments:progcomp:promptvars:sourcepath
BASH_ALIASES=()
BASH_ARGC=()
BASH_ARGV=()
BASH_CMDS=()
BASH_COMPLETION_COMPAT_DIR=/etc/bash_completion.d
BASH_LINENO=()
BASH_SOURCE=()
BASH_VERSINFO=([0]="4" [1]="3" [2]="48" [3]="1" [4]="release" [5]="x86_64-pc-linux-gnu")
BASH_VERSION='4.3.48(1)-release'
CLUTTER_IM_MODULE=xim
COLUMNS=92
COMPIZ_CONFIG_PROFILE=ubuntu
DBUS_SESSION_BUS_ADDRESS=unix:abstract=/tmp/dbus-z04Udzqwi8
DEFAULTS_PATH=/usr/share/gconf/ubuntu.default.path
DERBY_HOME=/usr/lib/jvm/java-8-oracle/db
DESKTOP_AUTOSTART_ID=10c167c524c0620a1160872439246457700000025900001
DESKTOP_SESSION=ubuntu
DIRSTACK=()
DISPLAY=:0
```

This is some of the information the shell will give other programs that users rarely see. Some programs will behave differently depending on the information available here.
