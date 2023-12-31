---
layout:       post
title:        >
    How to get Python Pillow (PIL) version?
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/63660906
type:         Answer
tags:         python python-imaging-library
created_date: 2020-08-30 18:38:17
edit_date:    
votes:        "0 "
favorites:    
views:        "55,508 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-08-30-How-to-get-Python-Pillow-_PIL_-version_.md
toc:          false
navigation:   false
clipboard:    false
---

If you are not importing the entire `PIL` library but instead have something like this:

``` 
from PIL import Image, ImageTk, ImageDraw, ImageFont
```

Then this works:

``` 
print('Image.VERSION', Image.VERSION)
print('Image.PILLOW_VERSION', Image.PILLOW_VERSION)
```

Results:

``` none
Image.VERSION 1.1.7
Image.PILLOW_VERSION 3.1.2
```

**Note:** Ubuntu 16.04.6 LTS uses older version of Pillow that was tested back in 2016. It appears the Ubuntu Folks (Canonical) don't like to upgrade python versions after testing.
