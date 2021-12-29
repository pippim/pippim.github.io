---
layout:       post
title:        dconf database how to remove duplicate & triplicates?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1090244
type:         Question
tags:         command-line database dconf gsettings
created_date: 2018-11-05 14:58:36
edit_date:    2020-06-12 14:37:07
votes:        2
favorites:    1
views:        315
accepted:     
uploaded:     2021-12-28 20:06:53
toc:          false
navigation:   false
clipboard:    false
---

My `gsettings` database has many entries that are duplicated or triplicated. Some are "normal" single entries.


``` 
$ gsettings --schemadir /usr/share/glib-2.0/schemas list-recursively | grep button-power
org.gnome.settings-daemon.plugins.power button-power 'interactive'
org.gnome.settings-daemon.plugins.power button-power 'interactive'

```

``` 
$ gsettings list-recursively | grep sudoku-difficulty
org.gnome.sudoku print-multiple-sudoku-difficulty 'easy'

$ gsettings list-recursively | grep print-wrap-mode
org.gnome.gedit.preferences.print print-wrap-mode 'word'
org.gnome.gedit.preferences.print print-wrap-mode 'word'
org.gnome.gedit.preferences.print print-wrap-mode 'word'
## 
```



## `dconf dump` and `dconf load` are not effective

The utility `dconf dump` doesn't show duplicate entries:

``` 
$ dconf dump /org/gnome/settings-daemon/plugins/power/
[/]
idle-dim=false
lid-close-battery-action='nothing'
critical-battery-action='shutdown'
lid-close-ac-action='nothing'

```

Running `dconf dump` of single entries to file and import same file using `dconf load` doesn't get rid of duplicate entries:

``` 
$ gsettings list-recursively | grep lid-close-battery
org.gnome.settings-daemon.plugins.power lid-close-battery-action 'nothing'
org.gnome.settings-daemon.plugins.power lid-close-battery-action 'nothing'

$ dconf dump /org/gnome/settings-daemon/plugins/power/ > dconf-lid-battery.txt

$ dconf load /org/gnome/settings-daemon/plugins/power/ < dconf-lid-battery.txt

$ gsettings list-recursively | grep lid-close-battery
org.gnome.settings-daemon.plugins.power lid-close-battery-action 'nothing'
org.gnome.settings-daemon.plugins.power lid-close-battery-action 'nothing'
## 
```



## Might be a bug?

Appears to be a bug:

- [gsettings list-recursively does not output paths while schema/key/value are path-dependent][4]

Based on bug reports it could be these three areas:

``` 
$ gsettings get org.freedesktop.ibus.general dconf-preserve-name-prefixes
['/desktop/ibus/engine/pinyin', '/desktop/ibus/engine/bopomofo', '/desktop/ibus/engine/hangul']

```


----------

## Replies to comments

Here are file and directory names of `/etc/dconf`:

``` 
$ tree /etc/dconf/
/etc/dconf/
├── db
│   ├── ibus
│   └── ibus.d
│       └── 00-upstream-settings
└── profile
    └── ibus

3 directories, 3 files
```
Two of three files are dated from 2016 (Ubuntu 16.04 development time):

``` 
-rw-r--r-- 1 root root 3163 Oct  1 16:51 /etc/dconf/db/ibus
-rw-r--r-- 1 root root 1978 Jan 19  2016 00-upstream-settings
-rw-r--r-- 1 root root   28 Jan 19  2016 /etc/dconf/profile/ibus
```

  [1]: https://askubuntu.com/questions/1017045/bash-one-liner-to-display-all-gsettings-in-zenity-or-yad/1017046#1017046
  [2]: https://i.stack.imgur.com/j9qV3.png
  [3]: https://askubuntu.com/questions/1039235/how-to-make-locate-output-look-like-ll-or-ls-la-but-nicer/1039236#1039236
  [4]: https://bugzilla.gnome.org/show_bug.cgi?id=723003#c12

