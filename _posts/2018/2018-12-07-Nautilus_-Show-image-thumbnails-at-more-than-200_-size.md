---
layout:       post
title:        >
    Nautilus: Show image thumbnails at more than 200% size
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1099186
type:         Answer
tags:         nautilus thumbnails
created_date: 2018-12-07 14:42:32
edit_date:    
votes:        "4 "
favorites:    
views:        "6,905 "
accepted:     
uploaded:     2025-02-15 10:53:31
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-12-07-Nautilus_-Show-image-thumbnails-at-more-than-200_-size.md
toc:          false
navigation:   false
clipboard:    false
---

Here is a script that is easier for "grandma" to use:



## `zoom` - Script to set Nautilus Thumbnail size

``` bash
#!/bin/bash

# NAME: zoom
# DESC: Change nautilus thumbnail size based on parameter 1
#       For Ask Ubuntu question: https://askubuntu.com/questions/1097934
#       /nautilus-show-images-with-more-than-200-size

# DATE: December 7, 2018

if [[ $# -ne 1 ]]; then
    echo "Usage: 'zoom 999'" 
    echo "Where 999 is zoom factor, eg 400 = 400% zoom"
    exit 1
fi

gsettings set org.gnome.nautilus.icon-view thumbnail-size "$1"
nautilus -q

exit 0
```

## Installation and Usage

Place the file `zoom` in your search path.

Mark the file executable with `chmod a+x /search-path-name/zoom`

Call the script from terminal using `zoom 999` where 999 is the zoom factor. For example `zoom 400` will have `nautilus` zoom by 400%.

The script can be enhanced to use `zenity` for a desktop shortcut with GUI pop up window that prompts for zoom percentage.
