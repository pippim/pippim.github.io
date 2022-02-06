---
layout:       post
title:        >
    In gnome-terminal only 2 out of 3 zoom keys work
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1138963
type:         Question
tags:         unity shortcut-keys gnome-terminal
created_date: 2019-04-28 20:09:31
edit_date:    
votes:        "3 "
favorites:    
views:        "165 "
accepted:     Accepted
uploaded:     2022-02-06 11:17:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-04-28-In-gnome-terminal-only-2-out-of-3-zoom-keys-work.md
toc:          false
navigation:   false
clipboard:    true
---

In `gnome-terminal` Ubuntu Unity 16.04 LTS the menu works for all three zoom features within the **View** menu:

- Zoom In
- Zoom Out
- Normal Size

Only two shortcut keys work:

- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>+</kbd> works to **Zoom In**
- <kbd>Ctrl</kbd>+<kbd>-</kbd> works to **Zoom Out**. 

Attempting to restore **Normal Size** I found <kbd>Ctrl</kbd>+<kbd>o</kbd> or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> do not work. These key combinations perform as if the <kbd>Enter</kbd> was used.

## My modified setup

``` 
$ cat .inputrc

# ~/.inputrc - complements /etc/inputrc - global inputrc for libreadline
# April 15, 2019
# See readline(3readline) and `info rluserman' for more information.

$include /etc/inputrc

# Insert key to togged overwrite-mode
"\e[2~": overwrite-mode

# April 22, 2019 AU Q&A: https://askubuntu.com/q/1135306/307523
# Make Shift-tab act like "cd ../" (move to parent directory)
"\e[Z": "cd ../"
```

## Custom keyboard shortcuts

[![keyboard shortcuts.png][1]][1]

- I believe these are standard. At least I don't remember changing them.
- I reviewed all the other shortcuts and <kbd>Ctrl</kbd>+<kbd>o</kbd> doesn't appear.

## Ubuntu skeleton setup

{% include copyHeader.html %}
``` 
$ cat /etc/inputrc

# /etc/inputrc - global inputrc for libreadline
# See readline(3readline) and `info rluserman' for more information.

# Be 8 bit clean.
set input-meta on
set output-meta on

# To allow the use of 8bit-characters like the german umlauts, uncomment
# the line below. However this makes the meta key not work as a meta key,
# which is annoying to those which don't need to type in 8-bit characters.

# set convert-meta off

# try to enable the application keypad when it is called.  Some systems
# need this to enable the arrow keys.
# set enable-keypad on

# see /usr/share/doc/bash/inputrc.arrows for other codes of arrow keys

# do not bell on tab-completion
# set bell-style none
# set bell-style visible

# some defaults / modifications for the emacs mode
$if mode=emacs

# allow the use of the Home/End keys
"\e[1~": beginning-of-line
"\e[4~": end-of-line

# allow the use of the Delete/Insert keys
"\e[3~": delete-char
"\e[2~": quoted-insert

# mappings for "page up" and "page down" to step to the beginning/end
# of the history
# "\e[5~": beginning-of-history
# "\e[6~": end-of-history

# alternate mappings for "page up" and "page down" to search the history
# "\e[5~": history-search-backward
# "\e[6~": history-search-forward

# mappings for Ctrl-left-arrow and Ctrl-right-arrow for word moving
"\e[1;5C": forward-word
"\e[1;5D": backward-word
"\e[5C": forward-word
"\e[5D": backward-word
"\e\e[C": forward-word
"\e\e[D": backward-word

$if term=rxvt
"\e[7~": beginning-of-line
"\e[8~": end-of-line
"\eOc": forward-word
"\eOd": backward-word
$endif

# for non RH/Debian xterm, can't hurt for RH/Debian xterm
# "\eOH": beginning-of-line
# "\eOF": end-of-line

# for freebsd console
# "\e[H": beginning-of-line
# "\e[F": end-of-line

$endif
```


Any clues?


  [1]: https://i.stack.imgur.com/wux85l.png
