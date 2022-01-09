---
layout:       post
title:        >
    How to make zenity "transient parent" warning disappear permanently
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/896936
type:         Answer
tags:         command-line bash gtk redirect zenity
created_date: 2017-03-26 01:32:34
edit_date:    2020-06-12 14:37:07
votes:        "6 "
favorites:    
views:        "5,402 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

# Automatically add `2>/dev/null` every time zenity is called

Edit the file `~/.bashrc` and search for these lines:

``` 
# some more ls aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

```

Add the following lines after:

``` 
# Add zenity alias to make the annoying terminal error message disappear forever:
# "Gtk-Message: GtkDialog mapped without a transient parent. This is discouraged."
alias zenity="zenity 2>/dev/null"

```

Save the file and open a new terminal window to test:

``` 
zenity --info --text "Hello Zenity-Silly-Error-Free World"

```

Voila! All your old code is fixed and future code doesn't need to have `2>/dev/null` appended to it like all the other answers instruct.

