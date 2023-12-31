---
layout:       post
title:        >
    Shift+Alt+Down does not work as Shortcut for PHPStorm or any other app Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064729
type:         Answer
tags:         18.04 shortcut-keys
created_date: 2018-08-12 17:55:02
edit_date:    2018-08-13 00:32:49
votes:        "1 "
favorites:    
views:        "659 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-Shift_Alt_Down-does-not-work-as-Shortcut-for-PHPStorm-or-any-other-app-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

Try a basic keyboard configuration. In my 16.04 and 18.04 it is setup like this:

``` 
$ cat /etc/default/keyboard
# KEYBOARD CONFIGURATION FILE

# Consult the keyboard(5) manual page.

XKBMODEL="pc105"
XKBLAYOUT="us"
XKBVARIANT=""
XKBOPTIONS=""

BACKSPACE="guess"
```


----------


There is a bug report: [Unable to use <Ctrl+Shift+key> shortcuts with <Ctrl+Shift> keyboard layout switcher on Ubuntu MATE, 16.04 (with HWE), 17.10 and 18.04 LTS][1]

Unfortunately the bug report has no fix yet.


----------


Fortunately there is a solution that might work posted by Norbert in another forum: [Keyboard layout switching problems and poll][2]:

``` 
sudo add-apt-repository ppa:nrbrtx/xorg-hotkeys
sudo apt-get update
sudo apt-get dist-upgrade
```

Please read both links thoroughly before proceeding.
  [1]: https://bugs.launchpad.net/ubuntu/+source/marco/+bug/1720364
  [2]: https://discourse.ubuntu.com/t/keyboard-layout-switching-problems-and-poll/2876

