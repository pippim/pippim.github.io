---
layout:       post
title:        >
    Can I change the font of the text-mode console?
site:         Unix & Linux
stack_url:    https://unix.stackexchange.com/q/455009
type:         Answer
tags:         console tty fonts
created_date: 2018-07-13 00:09:43
edit_date:    
votes:        "5 "
favorites:    
views:        "200,012 "
accepted:     
uploaded:     2022-01-19 20:21:13
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-13-Can-I-change-the-font-of-the-text-mode-console^.md
toc:          false
navigation:   false
clipboard:    false
---

Using Ubuntu 16.04 (probably works in all supported versions), I edited `~/.bashrc` and just before terminal splash at end of file, inserted the `setfont` command:

``` 
# Set font when running in console
/bin/setfont /usr/share/consolefonts/Lat2-Terminus32x16.psf.gz    

# Splash Calendar and time
now

# ASCII Linux distribution display
screenfetch
```

Now when selected <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> through <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F6</kbd> and get nice big fonts.

This is the largest font available and you can see a complete list with `ls` command:

``` 
$ ls /usr/share/consolefonts
Arabic-Fixed15.psf.gz             Lat15-Terminus20x10.psf.gz
Arabic-Fixed16.psf.gz             Lat15-Terminus22x11.psf.gz
Arabic-VGA14.psf.gz               Lat15-Terminus24x12.psf.gz
    (... SNIP ...)
Lat15-Terminus14.psf.gz           Vietnamese-Fixed16.psf.gz
Lat15-Terminus16.psf.gz           Vietnamese-Fixed18.psf.gz
```

## Sample screen

This is a facsimile, not a true screen capture from console where screen is wider by 20% and background is black:

[![Sample console fonts][1]][1]

Prior to changes I couldn't read the screen on HDPI monitor.


  [1]: https://i.stack.imgur.com/BoJoM.png
