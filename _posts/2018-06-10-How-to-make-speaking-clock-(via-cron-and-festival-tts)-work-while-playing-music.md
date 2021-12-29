---
layout:       post
title:        How to make speaking clock (via cron and festival tts) work while playing music
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045336
type:         Answer
tags:         sound pulseaudio alsa cron 15.04
created_date: 2018-06-10 16:02:33
edit_date:    2018-06-10 17:38:32
votes:        2
favorites:    
views:        928
accepted:     
uploaded:     2021-12-28 20:39:21
toc:          false
navigation:   false
clipboard:    false
---

As per this answer: https://askubuntu.com/questions/832072/can-i-use-cron-to-chime-at-top-of-hour-like-a-grandfather-clock/832266#832266 you need to export an environment variable before playing sounds in your cron script:

``` 
export XDG_RUNTIME_DIR="/run/user/1000"

```
