---
layout:       post
title:        >
    Keyboard shortcut to toggle (enable/disable) laptop touchpad
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/863750
type:         Answer
tags:         scripts shortcut-keys touchpad
created_date: 2016-12-23 06:06:32
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "3,624 "
accepted:     Accepted
uploaded:     2022-04-17 17:56:59
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-12-23-Keyboard-shortcut-to-toggle-_enable_disable_-laptop-touchpad.md
toc:          false
navigation:   false
clipboard:    true
---

# Script to toggle Touchpad on/off with screen notification

Partial credit to this post ([Enable/disable touchpad][1]) 

## Create toggle-touchpad script
Create a new directory `/home/USER/bin` and then use `gedit /home/USER/bin/toggle-touchpad`. **NOTE:** Replace **USER** with your user ID. Copy and paste these lines into your editor:

{% include copyHeader.html %}
``` bash
#!/bin/bash

# NAME: toggle-touchpad
# PATH: /home/$USER/bin
# DESC: Update pulseaudio output device when HDMI TV plugged / unplugged
# CALL: called from Keyboard Shortcut `Super`+`T`
# DATE: Created Dec 23, 2016.
# NOTE: Written for AU question: http://askubuntu.com/questions/863746/keyboard-shortcut-to-disable-the-laptop-touchpad/863750?noredirect=1#comment1333958_863750


# Use device number matching touchpad, in this case 14
if [[ $(xinput list 14 | grep -Ec "disabled") -eq 1 ]]; then
    xinput enable 14
    DISPLAY=:0 notify-send --urgency=critical --icon=/usr/share/icons/gnome/256x256/status/user-available.png "Touchpad enabled"
else
    xinput disable 14
    DISPLAY=:0 notify-send --urgency=critical --icon=/usr/share/icons/gnome/256x256/status/user-busy.png "Touchpad disabled"
fi

exit 0
```

### Mark toggle-touchpad script as executable

Save the file and exit the editor. Now flag the file as executable using `chmod +x /home/USER/bin/toggle-touchpad`

### Assign toggle-touchpad script to keyboard shortcut

Open up `System Settings` ⟶ `Keyboard` ⟶ `Shortcuts` ⟶ `Custom Shortcuts` ⟶ `+`

This screen appears:

[![toggle-touchpad][2]][2]

Fill in the Custom Shortcut fields like this:

 - Name = `Toggle Touchpad`
 - Command = `/home/USER/bin/toggle-touchpad`

Click <kbd>Apply</kbd> button to save.

The new entry appears with status *Disabled*. Right click on *Disabled* and use <kbd>Super</kbd>+<kbd>Z</kbd> (or any other unused shortcut combination). I wanted to use <kbd>Super</kbd>+<kbd>T</kbd> but that is already assigned to **Nautilus Trashcan**.

### Modify toggle-touchpad script to different device number

The default device number is set at 14. To find out what your device number is use the following:

``` 
───────────────────────────────────────────────────────────────────────────────
USER@host:~/bin$ xinput
⎡ Virtual core pointer                      id=2    [master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer                id=4    [slave  pointer  (2)]
⎜   ↳ Logitech Performance MX                   id=10   [slave  pointer  (2)]
⎜   ↳ Logitech K800                             id=11   [slave  pointer  (2)]
⎜   ↳ AlpsPS/2 ALPS GlidePoint                  id=14   [slave  pointer  (2)]
⎣ Virtual core keyboard                     id=3    [master keyboard (2)]
    ↳ Virtual core XTEST keyboard               id=5    [slave  keyboard (3)]
    ↳ Power Button                              id=6    [slave  keyboard (3)]
    ↳ Video Bus                                 id=7    [slave  keyboard (3)]
    ↳ Power Button                              id=8    [slave  keyboard (3)]
    ↳ Sleep Button                              id=9    [slave  keyboard (3)]
    ↳ Laptop_Integrated_Webcam_HD               id=12   [slave  keyboard (3)]
    ↳ Dell WMI hotkeys                          id=15   [slave  keyboard (3)]
    ↳ AT Translated Set 2 keyboard              id=13   [slave  keyboard (3)]
───────────────────────────────────────────────────────────────────────────────
USER@host:~/bin$ 
```

You can pick any device you like, ie Touchpad = 14, Webcam =  12, etc.

Which ever device number you use, simply open your `/home/USER/bin/toggle-touchpad` script and replace `14` with that device number.

### Modify toggle-touchpad script to use different icons

When the "Touchpad enabled" / "Touchpad disabled" notification bubble is displayed, an icon is displayed left of the text. Stock icons are used from `/usr/share/icons/gnome/256x256/status/` but you can change them. 

For enabling touchpad this is displayed:

[![user available][3]][3]

For disabling touchpad this is displayed:

[![user busy][4]][4]


  [1]: https://askubuntu.com/questions/844151/enable-disable-touchpad
  [2]: https://i.stack.imgur.com/2mWMv.png
  [3]: https://i.stack.imgur.com/Monan.png
  [4]: https://i.stack.imgur.com/nED9s.png
