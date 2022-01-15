---
layout:       post
title:        >
    Is there any Ubuntu flavor that handles HiDPI consistently?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/848445
type:         Answer
tags:         hdpi
created_date: 2016-11-12 04:53:19
edit_date:    2016-11-12 05:37:35
votes:        "2 "
favorites:    
views:        "29,450 "
accepted:     
uploaded:     2022-01-14 20:03:42
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-11-12-Is-there-any-Ubuntu-flavor-that-handles-HiDPI-consistently^.md
toc:          false
navigation:   false
clipboard:    false
---

## The Problem

This is the strangest answer I've written. When upgrading to Ubuntu 16.04 I had to set scaling factor to 1.4 on this screen:

[![Screen Scaling][1]][1]

I know it says 1.5 but 1.4 worked better and I had also tried 1.25.

Next I had to go into Google Chrome and set "Large Font" in the settings. Alternatively I had tried setting zoom factor to 110% and 125%.

## The Solution
I fixed this by acccident using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F5</kbd>, logging into the console and typing `startx`. Then using <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd>, logging into to console and typing `sudo reboot`.

Upon signing in all the icons and menu lines were super enlarged and I reset monitor scaling (in picture above) to 1.0. I then had to change Google-Chrome font size from "large" to "normal".

## The Explanation

I wouldn't believe this solution myself unless it happened to me.

I then discovered the command `xrandr --listmonitors` which shows:

``` 
$ xrandr --listmonitors
Monitors: 2
 0: +*LVDS1 1920/382x1080/215+0+1080  LVDS1
 1: +HDMI1 1920/1107x1080/623+0+0  HDMI1

```

Notice the screen size 382x215 millimeters for the 17" laptop display (LVDS1) and 1107x623 millimeters for the 50" TV. This plays an important role in the new DPI scaling I'm benefiting from, but I don't have the experience to explain it academically.

So yes it's an incredulous answer and I wouldn't believe it had it not happened to me. I believe there must be a better method such as reconfiguring X, perhaps by deleting a configuration file so it's automatically rebuilt but, I don't know that shorter solution.

## The Proof

The end result is what is important:

[![Screen no scaling][2]][2]


  [1]: https://i.stack.imgur.com/C5RnB.png
  [2]: https://i.stack.imgur.com/2NSdP.png
