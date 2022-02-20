---
layout:       post
title:        >
    How to clear history in Gedit? (Ubuntu 18.04)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1128496
type:         Answer
tags:         18.04 gnome gedit
created_date: 2019-03-25 10:58:13
edit_date:    2019-07-01 18:14:53
votes:        "2 "
favorites:    
views:        "2,679 "
accepted:     
uploaded:     2022-02-20 10:08:02
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-03-25-How-to-clear-history-in-Gedit_-_Ubuntu-18.04_.md
toc:          false
navigation:   false
clipboard:    false
---

# Permanent method to always set number of entries

I'm revising my answer with a variation of [this GUI answer](https://askubuntu.com/a/1089134/307523) for command line users.

Use this command to get current number of entries:

``` 
$ gsettings get org.gnome.gedit.preferences.ui max-recents

uint32 5
```

I want to change to `10` so I'll use this command:

``` 
$ gsettings set org.gnome.gedit.preferences.ui max-recents 10

$ gsettings get org.gnome.gedit.preferences.ui max-recents

uint32 10
```

If you permanently want to have zero saved recent files change `10` to `0`. Notice how the `get` command is repeated after the `set` command to ensure it "sticks".

# Manual method to remove entries
The `gedit` most recent files list are stored in `USER_DIR/.local/share/recently-used.xbel`.

## Root User

``` 
$ sudo cat /root/.local/share/recently-used.xbel
<?xml version="1.0" encoding="UTF-8"?>
<xbel version="1.0"
      xmlns:bookmark="http://www.freedesktop.org/standards/desktop-bookmarks"
      xmlns:mime="http://www.freedesktop.org/standards/shared-mime-info"
>
  <bookmark href="file:///etc/default/grub" added="2018-08-03T19:25:50Z" modified="2018-12-27T17:03:38Z" visited="2018-08-03T19:25:51Z">
    <info>
      <metadata owner="http://freedesktop.org">
        <mime:mime-type type="text/plain"/>
        <bookmark:groups>
          <bookmark:group>gedit</bookmark:group>
        </bookmark:groups>
        <bookmark:applications>
          <bookmark:application name="gedit" exec="&apos;gedit %u&apos;" modified="2018-12-27T17:03:38Z" count="41"/>
        </bookmark:applications>
      </metadata>
    </info>
  </bookmark>
```

## Normal User

``` 
$ cat ~/.local/share/recently-used.xbel
<?xml version="1.0" encoding="UTF-8"?>
<xbel version="1.0"
      xmlns:bookmark="http://www.freedesktop.org/standards/desktop-bookmarks"
      xmlns:mime="http://www.freedesktop.org/standards/shared-mime-info"
>
  <bookmark href="file:///home/rick/.conkyrc" added="2019-03-15T10:57:55Z" modified="2019-03-23T19:04:43Z" visited="2019-03-15T10:57:55Z">
    <info>
      <metadata owner="http://freedesktop.org">
        <mime:mime-type type="text/plain"/>
        <bookmark:groups>
          <bookmark:group>gedit</bookmark:group>
        </bookmark:groups>
        <bookmark:applications>
          <bookmark:application name="gedit" exec="&apos;gedit %u&apos;" modified="2019-03-23T19:04:43Z" count="50"/>
        </bookmark:applications>
      </metadata>
    </info>
  </bookmark>
```

When removing a `gedit` entry delete all lines from `<bookmark href...>` to `</bookmark>` inclusive.

**NOTE:** Other applications store entries in this file, not just `gedit`.

