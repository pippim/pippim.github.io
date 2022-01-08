---
layout:       post
title:        >
    How to stop Ubuntu from changing numlock state on boot?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1184884
type:         Answer
tags:         boot 18.04 keyboard login-screen numlock
created_date: 2019-10-30 00:37:11
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "3,516 "
accepted:     Accepted
uploaded:     2022-01-07 19:08:07
toc:          false
navigation:   false
clipboard:    false
---

## For Ubuntu Gnome 18.04+

When you are at the login screen the user ID active is `gdm` (Gnome Desktop Manager). To change that profile login with your own user ID and use:

<!-- Language-all: lang-bash -->

``` 
sudo -i
xhost +SI:localuser:gdm
su gdm -s /bin/bash
gsettings set org.gnome.settings-daemon.peripherals.keyboard numlock-state 'on'
gsettings set org.gnome.desktop.peripherals.touchpad tap-to-click true

```

For a plethora of even more options:

- [How to enable numlock at boot time for login screen?](How to enable numlock at boot time for login screen?)


----------


## For Ubuntu Unity 16.04+

Install the the program `numlockx`:

``` 
$ sudo apt update && sudo apt install numlockx

$ numlockx -h
NumLockX 1.2
(C) 2000-2001 Lubos Lunak <l.lunak@kde.org>
(C) 2001      Oswald Buddenhagen <ossi@kde.org>

Usage: numlockx [on|off|toggle|status]
on     - turns NumLock on in X ( default )
off    - turns NumLock off in X
toggle - toggles the NumLock on and off in X
status - gets the NumLock status

```

Next step is to get it running during login screen:

``` 
$ locate 50-unity-greeter.conf
/usr/share/lightdm/lightdm.conf.d/50-unity-greeter.conf

$ sudo -H gedit /usr/share/lightdm/lightdm.conf.d/50-unity-greeter.conf

```

### At bottom of file add:

``` 
greeter-setup-script=/usr/bin/numlockx on

```

Save file and login again.


----------


## Catchall when everything fails

Install `numlockx` as show above. Then

``` 

$ sudo -H gedit /etc/rc.local

```

### At bottom of file add:

``` 
/usr/bin/numlockx on

```

Save file and reboot.
