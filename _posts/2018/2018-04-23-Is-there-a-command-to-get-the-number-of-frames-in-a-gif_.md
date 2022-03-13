---
layout:       post
title:        >
    Is there a command to get the number of frames in a gif?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1027295
type:         Answer
tags:         command-line imagemagick image-processing gif
created_date: 2018-04-23 00:29:47
edit_date:    2020-06-12 14:37:07
votes:        "9 "
favorites:    
views:        "12,944 "
accepted:     
uploaded:     2022-03-13 13:23:56
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-04-23-Is-there-a-command-to-get-the-number-of-frames-in-a-gif_.md
toc:          false
navigation:   false
clipboard:    false
---

### One-liner command

Inspired by this [article][1], use this one-liner command:

``` 
$ identify drop_caches.gif | wc -l
128
```

For more details use:

``` 
identify -verbose filename.gif
```


----------


This [website][2] lets you upload your `.gif` and analyzes it many ways including the number of frames in it:

[![ezgif.png][3]][3]


----------


The `convert` provided by **Image Magic** will convert your `.gif` into individual `.png` images one for each frame:

``` 
$ convert -verbose -coalesce drop_caches.gif drop_caches.png
drop_caches.gif[0] GIF 470x940 470x940+0+0 8-bit sRGB 256c 177KB 0.090u 0:00.099
drop_caches.gif[1] GIF 13x1 470x940+398+704 8-bit sRGB 256c 177KB 0.080u 0:00.089
drop_caches.gif[2] GIF 306x620 470x940+144+130 8-bit sRGB 256c 177KB 0.080u 0:00.089
    (... SNIP ...)
drop_caches.gif=>drop_caches-125.png[125] GIF 470x940 470x940+0+0 8-bit sRGB 255c 50.3KB 27.100u 0:24.890
drop_caches.gif=>drop_caches-126.png[126] GIF 470x940 470x940+0+0 8-bit sRGB 254c 48.9KB 27.320u 0:25.089
drop_caches.gif=>drop_caches-127.png[127] GIF 470x940 470x940+0+0 8-bit sRGB 254c 48.9KB 27.480u 0:25.269
```






  [1]: https://gnutips.wordpress.com/2010/08/10/view-image-file-metadata-from-the-command-line/
  [2]: https://ezgif.com/split/ezgif-3-a91fe0e517.gif
  [3]: https://i.stack.imgur.com/wgCVZ.png
