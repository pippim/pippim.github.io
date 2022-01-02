---
layout:       post
title:        >
    How can i Optimize font for my UHD Screen in Unity
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/859565
type:         Answer
tags:         unity desktop-environments settings
created_date: 2016-12-11 19:40:19
edit_date:    2016-12-11 20:27:09
votes:        "2 "
favorites:    
views:        "377 "
accepted:     Accepted
uploaded:     2022-01-02 16:31:33
toc:          false
navigation:   false
clipboard:    false
---

There are four things you can do:

 - Unity Tweak Tool
 - Settings -> Screen Display
 - Adjust font size application by application
 - Adjust DPI using `xrandr`

# Unity Tweak Tool

Install Unity Tweak Tool using:

``` 
sudo apt install unity-tweak-tool

```

Then open Dash using <kbd>Alt</kbd>+<kbd>F2</kbd> and type "Unity". The Unity Tweak Tool icon will appear and click on it.

From the Tweak Tool window select `Fonts`. This screen will appear:

[![Unity Tweak Tool Fonts][1]][1]

Adjust the scaling factor to fit your preferences.

# Settings -> Screen Display

Click on the Launchers gear icon for `System Settings`. From the panel select `Screen Display`. Adjust the screen scaling for **Menus and Title Bars** as shown below to a factor that suits your preferences:

[![Screen Scaling][2]][2]

# Adjust font size application by application

In most applications you can change the font size. For example, with scaling up some fonts may appear to large. In Chrome, Nautilus and Terminal you can set the default font to a smaller size.

# Adjust DPI using `xrandr`

Some applications, for example `Kid3` ignore High DPI scaling in Ubuntu and insist on using a tiny font. For applications such as these an `xrandr` command can be issued at the terminal before invoking the application:

``` 
xrandr --dpi 144

```

Change 144 to any number which is a multiple of 16 for best results, ie: 96, 128, 144, etc.

  [1]: https://i.stack.imgur.com/CnV55.png
  [2]: https://i.stack.imgur.com/4G1Bn.png
