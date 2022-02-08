---
layout:       post
title:        >
    How to install 2 Graphics drivers, and have Ubuntu detect and load which one (without conflict)
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1064740
type:         Answer
tags:         nvidia graphics amd-graphics vga
created_date: 2018-08-12 18:34:19
edit_date:    
votes:        "2 "
favorites:    
views:        "237 "
accepted:     
uploaded:     2022-02-07 17:28:41
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-12-How-to-install-2-Graphics-drivers_-and-have-Ubuntu-detect-and-load-which-one-_without-conflict_.md
toc:          false
navigation:   false
clipboard:    false
---

Ubuntu automatically detects which GPU is installed in your machine. If you want a script to switch between Nvida and Intel drivers I've found one you can modify here: [bauca/graphics-switcher][1]

It will require the program `glxinfo` which you can get by installing:

``` 
sudo apt install mesa-utils
```

One key function in the bash script that will interest you is this one:



``` bash
function CheckForCurrentVideoCardInUse {
	local _VIDEO_CARD=`glxinfo|egrep "OpenGL vendor|OpenGL renderer*"`
	if [[ $_VIDEO_CARD == *"NVIDIA"* && $_VIDEO_CARD == *"GeForce"* ]]; then
		CURRENT_VIDEO_CARD="NVIDIA"
	elif [[ $_VIDEO_CARD == *"Intel"* ]]; then
		CURRENT_VIDEO_CARD="INTEL"
	else
		ErrorHandler
	fi
}
```

  [1]: https://github.com/bauca/graphics-switcher/blob/master/Graphics-Switcher
