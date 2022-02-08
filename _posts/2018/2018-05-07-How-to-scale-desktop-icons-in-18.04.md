---
layout:       post
title:        >
    How to scale desktop icons in 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1033102
type:         Answer
tags:         18.04 icons scaling desktop-icons
created_date: 2018-05-07 10:48:46
edit_date:    2020-06-12 14:37:07
votes:        "2 "
favorites:    
views:        "13,480 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-05-07-How-to-scale-desktop-icons-in-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

## Ubuntu 18.04 with Unity Desktop

If you are using the Unity Desktop the most comprehensive method is font scaling which includes icons, title bars and other UI elements. To install it use:

``` 
sudo apt install unity-tweak-tool
```

Then call it from the command line or Dash.  The settings I'm using for scaling on a 1920x1080 monitor are:

[![Tweak fonts.png][1]][1]

**The *`Text scaling factor`* scales fonts and menu bars** Icon size is preset but the text size under it increases giving the illusion the icon size changed:

[![UbuntuTweakFonts.gif][2]][2]


In the `.gif` above scaling starts at `1.38` on a 1920x1080 monitor. Then it is changed to `1` and everything gets tiny, which is normal. Then it is changed to `2` which is ideal for the visually challenged. Once again the icons have fixed pixel size and the font shrinking or expanding under the icon gives the illusion their size is changing.

----------


Others may be interested in the full suite of "tweak" tools available for installing under **18.04 LTS**:

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
