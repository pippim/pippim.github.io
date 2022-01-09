---
layout:       post
title:        >
    How can I change the keybindings in Nautilus?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1043328
type:         Answer
tags:         gnome keyboard nautilus shortcut-keys
created_date: 2018-06-03 23:29:24
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "1,593 "
accepted:     
uploaded:     2022-01-09 15:58:35
toc:          false
navigation:   false
clipboard:    false
---

## Old Bug

This is an old bug appearing in many bug reports. This [bug report][1] is from 2009.

FireFox and Windows both support <kbd>Control</kbd>+<kbd>Tab</kbd> for switching tabs. On many laptops <kbd>Page Up</kbd> might be hard to reach or poorly labeled. Even on most desktop keyboards  <kbd>Control</kbd>+<kbd>Page Up</kbd> is impossible to perform with the left hand.

For one-handed shortcuts you can use <kbd>Alt</kbd>+<kbd>1</kbd> for the first tab, <kbd>Alt</kbd>+<kbd>2</kbd> for the second tab, etc.

[Gnome's design][2] is for <kbd>Control</kbd>+<kbd>Tab</kbd> is used for switching panes within windows. For example from the main pane to the left side pane.

----------

## Suggested `gsettings` hack that doesn't seem to work

A "hack" in this [bug report][3] illustrates these two `gsettings` you can view before changing:

``` 
$ gsettings get org.gnome.Terminal.Legacy.Keybindings:/org/gnome/terminal/legacy/keybindings/ next-tab
'<Control>Page_Down'
$ gsettings get org.gnome.Terminal.Legacy.Keybindings:/org/gnome/terminal/legacy/keybindings/ prev-tab
'<Control>Page_Up'

```

Then to change them use:

``` 
$ gsettings set org.gnome.Terminal.Legacy.Keybindings:/org/gnome/terminal/legacy/keybindings/next-tab '<Primary>Tab'
$ gsettings set org.gnome.Terminal.Legacy.Keybindings:/org/gnome/terminal/legacy/keybindings/prev-tab '<Primary><Shift>Tab'

```

This successfully changes behavior switching between `gnome-terminal` tabs but has no effect in Nautilus or even YAD.

  [1]: https://bugs.launchpad.net/hundredpapercuts/+bug/388508
  [2]: https://help.gnome.org/users/gnome-help/stable/keyboard-nav.html.en
  [3]: https://bugzilla.gnome.org/show_bug.cgi?id=738325
