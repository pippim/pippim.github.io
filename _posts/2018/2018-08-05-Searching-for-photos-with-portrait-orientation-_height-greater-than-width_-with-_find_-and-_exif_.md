---
layout:       post
title:        >
    Searching for photos with portrait orientation (height greater than width) with `find` and `exif`
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1062693
type:         Answer
tags:         command-line find exif
created_date: 2018-08-05 20:43:56
edit_date:    
votes:        "1 "
favorites:    
views:        "652 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-05-Searching-for-photos-with-portrait-orientation-_height-greater-than-width_-with-_find_-and-_exif_.md
toc:          false
navigation:   false
clipboard:    false
---

We can use a modified version of this answer: [How to find all images with a certain pixel size using commandline?](How to find all images with a certain pixel size using commandline?)

``` 
find . -iname "*.jpg" -type f -exec identify -format '%w %h %i' '{}' \; | awk '$1<$2'
```
