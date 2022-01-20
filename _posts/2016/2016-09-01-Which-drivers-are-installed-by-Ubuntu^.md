---
layout:       post
title:        >
    Which drivers are installed by Ubuntu?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/819407
type:         Answer
tags:         drivers system-installation
created_date: 2016-09-01 02:16:54
edit_date:    
votes:        "2 "
favorites:    
views:        "59 "
accepted:     
uploaded:     2022-01-19 20:24:24
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2016/2016-09-01-Which-drivers-are-installed-by-Ubuntu^.md
toc:          false
navigation:   false
clipboard:    false
---

The number of drivers are in the thousands I imagine. Your list needs to be expanded to include drivers for USB, wifi, ethernet, bluetooth, mouse, keyboard, touchpad, laptop ACPI's (like my Dell and Toshiba you probably don't have), CPU's, GPU's, etc. Some drivers like Nvidia GPU are optional and appear on Ubuntu's "Additional Driver's" tab under "Software & Updates" in the "System Settings" menu.

The majority of drivers don't come from Ubuntu but rather the Linux Kernel. New Kernel version can add more drivers for new hardware.

Do a search on *.ko files to get an appreciation of the scope of your question. I wouldn't want to take the time to go through and decide which ones are non-essential.

If today you don't have an Intel WiFi card would you want to delete the drivers as "non-essential" only to have a new Intel wifi card you install not work in the future? Besides after the next Ubuntu kernel update, all the "non-essential" drivers you deleted are installed again plus new "non-essential" drivers.
