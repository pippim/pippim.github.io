---
layout:       post
title:        >
    How do I increase the font size for a specific application in Ubuntu 18.04 running Gnome?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1157937
type:         Answer
tags:         18.04 gnome fonts display-resolution
created_date: !!str "2019-07-12 23:03:28"
edit_date:    !!str "2019-07-13 17:28:04"
votes:        !!str "3"
favorites:    
views:        !!str "2,259"
accepted:     Accepted
uploaded:     !!str "2021-12-31 19:06:59"
toc:          false
navigation:   false
clipboard:    false
---

<!-- Language-all: lang-bash -->

Create a script call `ue` (Unity Editor). Place within it:

``` 
#!/bin/bash
xrandr --dpi 144
unity-editor "$@"    # Or whatever the program is you want to run

```

Mark the script as executable using:

``` 
chmod a+x ue

```

Call the script using

``` 
./ue

```

- Or replace `./` with the directory name if not in the current directory
- Or leave off `./` if you have placed `ue` in your `$PATH` like `~/bin` or `/usr/local/bin`

Adjust 144 to 192 if you want it double magnification. Smaller if you want less magnification.

Your screen may blink when script starts up but that is normal.


----------

**TL;DR**

The default **DPI** (**D**ots **P**er **I**nch) is 96. When set to `100` font size increased by 4% which might not be noticeable. To confirm initial DPI use one of these commands:

``` 
$ xdpyinfo | grep dots
  resolution:    96x96 dots per inch

$ grep DPI /var/log/Xorg.0.log
[     9.555] (--) NVIDIA(0): DPI set to (43, 44); computed from "UseEdidDpi" X config
[     9.761] (==) modeset(G0): DPI set to (96, 96)

```

In the above script you can reset `xrandr` back to default DPI of `96` by adding the following line to the bottom:

``` 
xrandr --dpi 96

```

I've never encountered a need to do this, but you might.
