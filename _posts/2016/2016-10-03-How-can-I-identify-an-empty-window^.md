---
layout:       post
title:        >
    How can I identify an empty window?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/832523
type:         Answer
tags:         unity window conky
created_date: 2016-10-03 10:45:57
edit_date:    
votes:        "4 "
favorites:    
views:        "251 "
accepted:     
uploaded:     2022-01-19 20:35:30
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-10-03-How-can-I-identify-an-empty-window^.md
toc:          false
navigation:   false
clipboard:    true
---

Answering the first half of your question `How can I identify what produces this empty window`, with the window open, open the Terminal and type `xlsclients`:

{% include copyHeader.html %}
``` 
dell  bamfdaemon
dell  ibus-ui-gtk3
dell  ibus-x11
dell  unity-settings-daemon
dell  unity-panel-service
dell  indicator-printers-service
dell  indicator-keyboard-service
dell  unity-fallback-mount-helper
dell  polkit-gnome-authentication-agent-1
dell  nm-applet
dell  gnome-software
dell  nautilus
dell  compiz
dell  telepathy-indicator
dell  gnome-terminal-server
dell  update-notifier
dell  notify-osd
dell  hud-service
dell  google-chrome-stable
dell  conky
```

Then close the window and run `xlsclients` again. The process running the window will be the one(s) on the first list but not on the second.

Finding the process name is the first step to stopping it.

HTH.

