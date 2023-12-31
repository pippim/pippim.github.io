---
layout:       post
title:        >
    Fix MP4 files which were improperly stopped while recording due to lack of space?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/940820
type:         Answer
tags:         mp4
created_date: 2017-07-28 23:16:46
edit_date:    
votes:        "1 "
favorites:    
views:        "6,961 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2017/2017-07-28-Fix-MP4-files-which-were-improperly-stopped-while-recording-due-to-lack-of-space_.md
toc:          false
navigation:   false
clipboard:    false
---

Unfortunately I don't have any damaged m4a files of my own to try this out on but, [here][1] this is reported to have worked for some:

``` 
ffmpeg -i damagedfile.mp4 -c copy fixedfile.aac
```

I'm not sure if the fixed file has to be `.aac` format or can be `.mp4` like the original. I would try `.mp4` for the output file first if it was me.

From the same link there are repair services that can reportedly charge $90 to fix an `.mp4` file but I would avoid that.

  [1]: https://sound.stackexchange.com/questions/27182/how-to-recover-audio-from-an-incomplete-or-corrupted-aac-m4a-file
