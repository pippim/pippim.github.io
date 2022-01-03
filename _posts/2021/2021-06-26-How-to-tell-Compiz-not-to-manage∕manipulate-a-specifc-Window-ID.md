---
layout:       post
title:        >
    How to tell Compiz not to manage∕manipulate a specifc Window ID
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1348326
type:         Question
tags:         unity python xorg compiz window-manager
created_date: 2021-06-26 12:47:21
edit_date:    2021-06-27 17:49:15
votes:        "2 "
favorites:    1
views:        "25 "
accepted:     
uploaded:     2022-01-03 08:14:44
toc:          false
navigation:   false
clipboard:    false
---

I have a window I move from one monitor to another in steps. The **Compiz** "Place Window" plug-in intercepts the movements and initially stops it from moving to the next monitor. Then it jumps to the next monitor and freezes. Then it continues the last few steps.

To override the "place window" plugin python issues some CLI commands. **Note:** `$` and extra lines added for readability:

``` bash
$ gsettings get org.compiz.core:/org/compiz/profiles/unity/plugins/core/ active-plugins

['core', 'composite', 'opengl', 'regex', 'mousepoll', 'animation',
'wall', 'vpswitch', 'session', 'snap', 'workarounds',
'compiztoolbox', 'imgpng', 'resize', 'move', 'place', 'expo', 'fade',
'ezoom', 'scale', 'switcher', 'unityshell']
```

If `'place'` appears between the `'move'` and `'expo'` plug-ins, remove it using:

``` bash
$ gsettings set org.compiz.core:/org/compiz/profiles/unity/plugins/core/ active-plugins

"['core', 'composite', 'opengl', 'regex', 'mousepoll', 'animation',
'wall', 'vpswitch', 'session', 'snap', 'workarounds',
'compiztoolbox', 'imgpng', 'resize', 'move', 'expo', 'fade',
'ezoom', 'scale', 'switcher', 'unityshell']"
```

Then move window between two monitors gradually in steps. When done issue `gsettings` command again:

``` bash
$ gsettings set org.compiz.core:/org/compiz/profiles/unity/plugins/core/ active-plugins 

"['core', 'composite', 'opengl', 'regex', 'mousepoll', 'animation',
'wall', 'vpswitch', 'session', 'snap', 'workarounds',
'compiztoolbox', 'imgpng', 'resize', 'move', 'place', 'expo', 'fade',
'ezoom', 'scale', 'switcher', 'unityshell']"
```

In `python-xlib` is there a way of doing it by setting a Window state or property?
