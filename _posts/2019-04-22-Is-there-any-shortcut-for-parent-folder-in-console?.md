---
layout:       post
title:        Is there any shortcut for parent folder in console?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1136115
type:         Answer
tags:         command-line shortcut-keys
created_date: 2019-04-22 15:41:54
edit_date:    2019-04-22 15:48:16
votes:        2
favorites:    
views:        424
accepted:     
uploaded:     2021-12-28 11:11:13
toc:          false
navigation:   false
clipboard:    false
---

Create this file `/home/$USER/.inputrc` with the following:

``` 
# ~/.inputrc - complements /etc/inputrc - global inputrc for libreadline
# April 15, 2019
# See readline(3readline) and `info rluserman' for more information.

```

``` 
$include /etc/inputrc

# Insert key to togged overwrite-mode
"\e[2~": overwrite-mode

# April 22, 2019 AU Q&A: https://askubuntu.com/q/1135306/307523
# Make Shift-tab act like "cd ../" (move to parent directory)
"\e[Z": "cd ../"

```

Save the file and open a new terminal.

Now you can use <kbd>Shift</kbd>+<kbd>Tab</kbd> to send `cd ../` to the terminal.

Also included in the settings you can press <kbd>Insert</kbd> key to toggle between character overwrite (replace) mode and insert mode.
