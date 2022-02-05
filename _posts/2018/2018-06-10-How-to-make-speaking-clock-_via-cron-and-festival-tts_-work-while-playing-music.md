---
layout:       post
title:        >
    How to make speaking clock (via cron and festival tts) work while playing music
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045336
type:         Answer
tags:         sound pulseaudio alsa cron 15.04
created_date: 2018-06-10 16:02:33
edit_date:    2018-06-10 17:38:32
votes:        "2 "
favorites:    
views:        "953 "
accepted:     
uploaded:     2022-02-04 17:13:08
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-10-How-to-make-speaking-clock-_via-cron-and-festival-tts_-work-while-playing-music.md
toc:          false
navigation:   false
clipboard:    false
---

As per this answer: [Can I use cron to chime at top of hour like a grandfather clock?]({% post_url /2016/2016-10-02-Can-I-use-cron-to-chime-at-top-of-hour-like-a-grandfather-clock_ %})6 you need to export an environment variable before playing sounds in your cron script:

``` 
export XDG_RUNTIME_DIR="/run/user/1000"
```
