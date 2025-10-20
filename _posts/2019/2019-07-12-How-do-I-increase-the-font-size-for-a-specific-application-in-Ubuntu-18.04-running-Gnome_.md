---
layout:       post
title:        >
    How do I increase the font size for a specific application in Ubuntu 18.04 running Gnome?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157937
type:         Answer
tags:         18.04 gnome fonts display-resolution
created_date: 2019-07-12 23:03:28
edit_date:    2019-07-13 17:28:04
votes:        "3 "
favorites:    
views:        "4,727 "
accepted:     Accepted
uploaded:     2025-10-19 18:25:39
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-07-12-How-do-I-increase-the-font-size-for-a-specific-application-in-Ubuntu-18.04-running-Gnome_.md
toc:          false
navigation:   false
clipboard:    false
---



Create a script call `ue` (Unity Editor). Place within it:

``` bash
#!/bin/bash
xrandr --dpi 144
unity-editor "$@"    # Or whatever the program is you want to run
```

Mark the script as executable using:

``` bash
chmod a+x ue
```

Call the script using

``` bash
./ue
```

- Or replace `./` with the directory name if not in the current directory
- Or leave off `./` if you have placed `ue` in your `$PATH` like `~/bin` or `/usr/local/bin`

Adjust 144 to 192 if you want it double magnification. Smaller if you want less magnification.

Your screen may blink when script starts up but that is normal.


----------

**TL;DR**

The default **DPI** (**D**ots **P**er **I**nch) is 96. When set to `100` font size increased by 4% which might not be noticeable. To confirm initial DPI use one of these commands:

``` bash
$ xdpyinfo | grep dots
  resolution:    96x96 dots per inch

$ grep DPI /var/log/Xorg.0.log
[     9.555] (--) NVIDIA(0): DPI set to (43, 44); computed from "UseEdidDpi" X config
[     9.761] (==) modeset(G0): DPI set to (96, 96)
```

In the above script you can reset `xrandr` back to default DPI of `96` by adding the following line to the bottom:

``` bash
xrandr --dpi 96
```

I've never encountered a need to do this, but you might.
