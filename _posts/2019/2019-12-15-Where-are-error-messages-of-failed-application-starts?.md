---
layout:       post
title:        >
    Where are error messages of failed application starts?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1196247
type:         Answer
tags:         unity launcher unity-dash
created_date: !!str "2019-12-15 02:16:50"
edit_date:    !!str ""
votes:        !!str "2"
favorites:    
views:        !!str "290"
accepted:     
uploaded:     !!str "2021-12-31 19:13:18"
toc:          false
navigation:   false
clipboard:    false
---

This question is probably a duplicate of:

- https://askubuntu.com/questions/7502/capture-stdout-and-stderr-of-all-gui-programs

There are two answers there:

- Check the contents of `~/.xsession-errors` log and,
- Redirect output when calling command: `command >~/log/command.out.log 2>~/log/command.err.log`

Also if the process ID is known look at it's file descriptor `1` for stdout and `2` for stderr. This is described in detail in Unix & Linux:

- [Where does the output from an application started from the window manager go?][1]

To briefly summarize the top-voted answer:

``` 
lsof -p1234 | awk '$4 ~ /^[12][^0-9]/'
ls -l /proc/1234/fd/[12]

```

Of course the most common method is to simply call the GUI from the command line and your terminal window will show warning and error messages:

``` 
$ zenity --info --text "Hello World"
Gtk-Message: GtkDialog mapped without a transient parent. This is discouraged.

```



  [1]: https://unix.stackexchange.com/questions/86698/where-does-the-output-from-an-application-started-from-the-window-manager-go
