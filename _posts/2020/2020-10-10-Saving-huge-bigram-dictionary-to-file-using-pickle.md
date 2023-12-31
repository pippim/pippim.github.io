---
layout:       post
title:        >
    Saving huge bigram dictionary to file using pickle
site:         Stack Overflow
stack_url:    https://stackoverflow.com/q/64298203
type:         Answer
tags:         python file dictionary pickle
created_date: 2020-10-10 20:55:49
edit_date:    
votes:        "0 "
favorites:    
views:        "13,778 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2020/2020-10-10-Saving-huge-bigram-dictionary-to-file-using-pickle.md
toc:          false
navigation:   false
clipboard:    false
---

I captured images from `http://coverartarchive.org` and although slow downloading so many images, `pickle` had no problem with 155 MB:

``` 
$ ll
total 151756
-rw-rw-r--  1 rick rick 155208082 Oct 10 10:04 ipc.pickle
```

As I move beyond downloading images for just one CD, I'll come back and update this answer with larger pickle limits. Unfortunately I haven't found anywhere that states the pickling limits...
