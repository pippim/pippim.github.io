---
layout:       post
title:        >
    Enable fractional scaling for Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1029808
type:         Answer
tags:         display 18.04 scaling
created_date: 2018-04-29 18:14:34
edit_date:    2018-05-07 23:29:11
votes:        "7 "
favorites:    
views:        "283,676 "
accepted:     
uploaded:     2022-01-19 20:19:27
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-29-Enable-fractional-scaling-for-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I used Unity Tweak Tool in Ubuntu 16.04. I'm running now a test environment where 16.04 was upgraded to Ubuntu 18.04 LTS. I just checked and Unity Tweak Tool is still there and scaling my High DPI screens properly. The settings I'm using for scaling on a 1920x1080 monitor are:

[![Tweak fonts.png][1]][1]

**The *`Text scaling factor`* scales both fonts and UI elements like title bars, buttons, etc.**


----------

Icon size is preset but the text size under it increases giving the illusion the icon size changed:

[![UbuntuTweakFonts.gif][2]][2]

In the `.gif` above scaling starts at `1.38` on a 1920x1080 monitor. Then it is changed to `1` and everything gets tiny, which is normal. Then it is changed to `2` which is ideal for the visually challenged. Once again the icons have fixed pixel size and the font shrinking or expanding under the icon gives the illusion their size is changing.

----------


To install Unity Tweak Tool use:

``` 
sudo apt install unity-tweak-tool
```

Others may be interested in the full suite of tools available in **18.04 LTS**:

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
