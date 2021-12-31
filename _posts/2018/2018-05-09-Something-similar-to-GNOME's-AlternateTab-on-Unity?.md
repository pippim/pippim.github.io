---
layout:       post
title:        >
    Something similar to GNOME's AlternateTab on Unity?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033823
type:         Answer
tags:         unity gnome compiz
created_date: !!str "2018-05-09 01:39:33"
edit_date:    !!str "2020-06-12 14:37:07"
votes:        !!str "2"
favorites:    
views:        !!str "209"
accepted:     
uploaded:     !!str "2021-12-31 14:57:34"
toc:          false
navigation:   false
clipboard:    false
---

I looked at your link and honestly don't see how it is superior to <kbd>Alt</kbd>+<kbd>Tab</kbd> in Unity:

[![Alt Tab.gif][1]][1]

After the initial <kbd>Alt</kbd>+<kbd>Tab</kbd> if you keep holding down the <kbd>Alt</kbd> key and tap the the <kbd>Tab</kbd> key it cycles through Windows and those with two or more sub-windows lets you pick between them. I think this is superior to Windows 7 but perhaps I'm biased.

## Make sure you are running Unity

### For Ubuntu 16.04 LTS:

``` 
$ grep "^Exec" /usr/share/xsessions/*
/usr/share/xsessions/gnome.desktop:Exec=gnome-session --session=gnome
/usr/share/xsessions/ubuntu.desktop:Exec=gnome-session --session=ubuntu

```

### For Ubuntu 18.04 LTS:

``` 
$ grep "^Exec" /usr/share/xsessions/*
/usr/share/xsessions/gnome.desktop:Exec=gnome-session
/usr/share/xsessions/gnome-xorg.desktop:Exec=gnome-session
/usr/share/xsessions/ubuntu-communitheme-snap.desktop:Exec=env GNOME_SHELL_SESSION_MODE=ubuntu-communitheme /snap/communitheme/current/session
/usr/share/xsessions/ubuntu.desktop:Exec=env GNOME_SHELL_SESSION_MODE=ubuntu gnome-session --session=ubuntu
/usr/share/xsessions/unity.desktop:Exec=/usr/lib/gnome-session/run-systemd-session unity-session.target

```

Notice the last line (far right side) shows: `unity-session.target`

  [1]: https://i.stack.imgur.com/sv4fQ.gif

