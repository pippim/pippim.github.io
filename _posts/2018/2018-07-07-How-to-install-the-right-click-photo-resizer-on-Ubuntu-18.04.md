---
layout:       post
title:        >
    How to install the right-click photo-resizer on Ubuntu 18.04
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1053089
type:         Answer
tags:         nautilus 18.04 ubuntu-mate photo
created_date: 2018-07-07 20:27:14
edit_date:    
votes:        "3 "
favorites:    
views:        "3,383 "
accepted:     
uploaded:     2022-04-12 18:17:38
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-07-07-How-to-install-the-right-click-photo-resizer-on-Ubuntu-18.04.md
toc:          false
navigation:   false
clipboard:    false
---

I'm not using Ubuntu Mate 18.04 but this [article][1] describes Right Click setup. To summarize:

``` 
sudo apt install imagemagick
sudo apt install nautilus-image-converter
nautilus -q # Reloads nautilus configuration
```

Watch the screen carefully for error messages that may appear under Ubuntu Mate 18.04. There were no errors in Ubuntu 16.04 and two new options appear on the right click Nautilus menu:

- Resize images...
- Rotate images...

Resizing an image appears to work perfectly.

  [1]: https://itsfoss.com/resize-images-with-right-click/
