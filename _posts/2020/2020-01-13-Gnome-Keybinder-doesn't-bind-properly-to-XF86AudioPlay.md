---
layout:       post
title:        >
    Gnome Keybinder doesn't bind properly to XF86AudioPlay
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/59716170
type:         Question
tags:         python gtk key-bindings gnome gdk
created_date: 2020-01-13 11:53:58
edit_date:    2020-06-20 09:12:55
votes:        "0 "
favorites:    
views:        "339 "
accepted:     Accepted
uploaded:     2022-01-01 10:05:50
toc:          false
navigation:   false
clipboard:    true
---

I've successfully managed to get a Python program to listen for <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>P</kbd> and <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd> even when the window doesn't have focus.

However I can't seem to capture `<FX86Audio...>` events even though the succesfully bind (if spelled correctly).

Here is a code snippet that works:

{% include copyHeader.html %}
``` python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
##!/usr/bin/python3.5       <- Test this every now and then for compatability

# Reqquires:
# sudo apt-get install libkeybinder-3.0-0 gir1.2-keybinder


'''
From : https://stackoverflow.com/questions/56517261/global-hotkey-in-python3-using-gtk-and-xlib
'''
import gi
# Python 2
gi.require_version('Gtk', '3.0')
gi.require_version('Gdk', '3.0')
gi.require_version('Keybinder', '3.0')
# Python 3
#gi.require_versions({"Gtk": "3.0", "Gdk": "3.0", "Keybinder": "3.0"})
from gi.repository import Gtk, Gdk, Keybinder, Pango

class A:
    def __init__(self):

        # Basic setup of a window with a label
        self.win = Gtk.Window()
        self.lab = Gtk.Label(label="Hello World!")
        self.lab.modify_font(Pango.FontDescription("sans 36"))

        self.win.add(self.lab)
        self.win.connect("destroy", Gtk.main_quit)
        self.win.show_all()

        self.count = 0

        key = Keybinder  # The module to bind keys
        # key.bind(KEYCOMBINATION, FUNC, ARG)
        key.bind("<control><alt>p", self.say, "Hello")
        key.bind("<control><alt>o", self.say, "World!")
        key.bind("<XF86AudioPlay>", self.say, "World :)")
        key.bind("<XF86AudioPause>", self.say, "World :(")
        key.bind("<AudioPlay>", self.say, "World :/")

        key.init()  # Call the mainloop something like Gtk.main()

    def say(self, key, msg):
        self.count += 1
        print(msg)
        # Python 2
        text="Pressed "+ key + " " + str(self.count) + " times"
        self.lab.set_label(text)
        # Python 3
        # self.lab.set_label(f"Pressed {key} {self.count} times")


A()  # Call the object
if not Keybinder.bind("<control><alt>p", A.say, "Bad News 1"):
    print "Keybinder.bind() failed 1."
if not Keybinder.bind("<XF86AudioPlay>", A.say, "Bad News 2"):
    print "Keybinder.bind() failed 2."
Gtk.main()  # Call the main loop

```

As mentioned earlier these key bindings are accepted but do not work:

``` 
    key.bind("<XF86AudioPlay>", self.say, "World :)")
    key.bind("<XF86AudioPause>", self.say, "World :(")
    key.bind("<AudioPlay>", self.say, "World :/")

```

The keyboard works for pausing and playing with `rhythembox`.

Thinking that Unity was getting in the way I remapped `<XF86AudioPlay>` keyboard shortcut to another sequence to no avail.

On other websites it talks about `gsettings` and mine seem OK for Ubuntu 16.04 with Unity interface:

[![gsettings glugins.media-keys.png][1]][1]


----------

# Reply to comments

Here is `xev` output:

``` 
KeymapNotify event, serial 37, synthetic NO, window 0x0,
    keys:  13  0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   
           0   0   0   0   0   16  0   0   0   0   0   0   0   0   0   0   

KeyRelease event, serial 37, synthetic NO, window 0x3a00001,
    root 0x259, subw 0x0, time 802402347, (1900,975), root:(3820,1027),
    state 0x10, keycode 172 (keysym 0x1008ff14, XF86AudioPlay), same_screen YES,
    XLookupString gives 0 bytes: 
    XFilterEvent returns: False
```

Adding `init` and changing order did not make `XF86AudioPlay` work but on the other hand did not break <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>P</kbd> and <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>O</kbd> which continue to work.

Here's what I added / changed order of:

``` 
    Keybinder.init()
    key = Keybinder  # The module to bind keys
    key.init()  # Call the mainloop something like Gtk.main()

```


----------

# Reply to comments 2

Added:

``` 
if not Keybinder.bind("<control><alt>p", A.say, "Bad News 1"):
    print "Keybinder.bind() failed 1."
if not Keybinder.bind("<XF86AudioPlay>", A.say, "Bad News 2"):
    print "Keybinder.bind() failed 2."
```

The first keybinder is successful but the second one prints to terminal:

``` 
Keybinder.bind() failed 2.

```

  [1]: https://i.stack.imgur.com/V8fhX.png
