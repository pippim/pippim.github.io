---
layout:       post
title:        >
    Can I run Steam as its own standalone session?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1068372
type:         Answer
tags:         steam
created_date: 2018-08-24 01:08:33
edit_date:    
votes:        "2 "
favorites:    
views:        "15,003 "
accepted:     
uploaded:     2022-01-09 12:45:43
toc:          false
navigation:   false
clipboard:    false
---

Another answer references:

``` 
sudo add-apt-repository ppa:thor27-gmail/steam-desktop

```

But from the author's [Steam Login github page][1] it is stated:

> **The PPA is really outdated**, and I'm not much inclined to maitain it anymore. If anything changes I will update here.  

By comparison the **github page** was modified in late 2017.


----------

# Arch Linux

## steam

Arch Linux has some [Tips and Tricks][2] for running steam:

### Big Picture Mode without a window manager

To start Steam in Big Picture Mode from a Display manager, create a `/usr/share/xsessions/steam-big-picture.desktop` file with the following contents:

#### /usr/share/xsessions/steam-big-picture.desktop

``` 
[Desktop Entry]
Name=Steam Big Picture Mode
Comment=Start Steam in Big Picture Mode
Exec=/usr/bin/steam -bigpicture
TryExec=/usr/bin/steam
Icon=
Type=Application

```

### Steam skins

The Steam interface can be customized using skins. Skins can overwrite interface-specific files in `~/.steam/root`.

To install a skin:

-   Place its directory in `~/.steam/root/skins`.
-   Open `Steam` > `Settings` > `Interface` and select it.
-   Restart Steam.

An extensive list of skins can be found in this [Steam forums post][3].
Note: Using an outdated skin may cause visual errors.


### Creating skins

Nearly all Steam styles are defined in `~/.steam/root/resource/styles/steam.styles` (the file is over 3,500 lines long). For a skin to be recognized it needs its own `resource/styles/steam.styles`. When a Steam update changes the official steam.styles your skin may become outdated, potentially resulting in visual errors.

See `~/.steam/root/skins/skins_readme.txt` for a primer on how to create skins. 

## General Gaming Advise in Arch

It's quite a lengthy page on [Gaming][4] covering both audio lag and video fps. There is even a section on creating a separate X-Windows environment just for gaming.

### Double check your CPU frequency scaling settings

If your system is currently configured to properly insert its own cpu frequency scaling driver, the system sets the default governor to Ondemand. By default, this governor only adjusts the clock if the system is utilizing 95% of its CPU, and then only for a very short period of time. This saves power and reduces heat, but has a noticeable impact on performance. You can instead only have the system downclock when it is idle, by tuning the system governor. To do so, see [Cpufrequtils#Tuning the ondemand governor][5]. 


  [1]: https://github.com/thor27/steam-login
  [2]: https://wiki.archlinux.org/index.php/Steam#Tips_and_tricks
  [3]: https://steamcommunity.com/discussions/
  [4]: https://wiki.archlinux.org/index.php/Gaming
  [5]: https://wiki.archlinux.org/index.php/CPU_frequency_scaling#Tuning_the_ondemand_governor
