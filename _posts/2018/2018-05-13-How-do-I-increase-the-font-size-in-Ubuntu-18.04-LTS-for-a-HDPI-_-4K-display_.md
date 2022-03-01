---
layout:       post
title:        >
    How do I increase the font size in Ubuntu 18.04 LTS for a HDPI / 4K display?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1035541
type:         Answer
tags:         fonts hdpi
created_date: 2018-05-13 01:36:42
edit_date:    
votes:        "7 "
favorites:    
views:        "42,764 "
accepted:     
uploaded:     2022-02-28 18:40:03
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-13-How-do-I-increase-the-font-size-in-Ubuntu-18.04-LTS-for-a-HDPI-_-4K-display_.md
toc:          false
navigation:   false
clipboard:    false
---

You may use *(UNITY) Tweaks* to adjust font size along with other UI elements. Install it using:

``` 
sudo apt install unity-tweak-tool
```

The settings I'm using for scaling on a 1920x1080 monitor are 1.38 times. You would probably want 2.00 or higher:

[![Tweak fonts.png][1]][1]

The *`Text scaling factor`* scales both fonts and UI elements like title bars, menus, etc.


----------

Here's a GIF showing changing scaling from 1.38 to 1.00 and then to 2.00:

[![UbuntuTweakFonts.gif][2]][2]

In the `.gif` above scaling starts at `1.38` on a 1920x1080 monitor. Then it is changed to `1` and everything gets tiny, which is normal. Then it is changed to `2` which is ideal for the visually challenged. Once again the icons have fixed pixel size and the font shrinking or expanding under the icon gives the illusion their size is changing.

----------

There are others *tweak* tools that may be of interest in **18.04 LTS**:

``` 
$ apt list | grep tweak
gajim-rostertweaks/bionic,bionic 1.0.0-3 all
gnome-tweak-tool/bionic,bionic 3.28.1-1 all
gnome-tweaks/bionic,bionic 3.28.1-1 all
mate-tweak/bionic,bionic 18.04.16-1 all
mousetweaks/bionic,bionic,now 3.12.0-4 amd64 [installed]
tweak/bionic 3.02-2 amd64
unity-tweak-tool/bionic,bionic,now 0.0.7ubuntu4 all [installed]
```

  [1]: https://i.stack.imgur.com/ebLJk.png
  [2]: https://i.stack.imgur.com/VujGV.gif
