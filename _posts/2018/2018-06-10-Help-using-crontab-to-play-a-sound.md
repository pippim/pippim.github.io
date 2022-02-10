---
layout:       post
title:        >
    Help using crontab to play a sound
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1045344
type:         Answer
tags:         sound cron
created_date: 2018-06-10 16:17:17
edit_date:    2018-06-10 17:39:19
votes:        "8 "
favorites:    
views:        "5,004 "
accepted:     
uploaded:     2022-02-10 05:58:33
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-06-10-Help-using-crontab-to-play-a-sound.md
toc:          false
navigation:   false
clipboard:    false
---

As per this answer: [Can I use cron to chime at top of hour like a grandfather clock?]({% post_url /2016/2016-10-02-Can-I-use-cron-to-chime-at-top-of-hour-like-a-grandfather-clock_ %})6 you need to export an environment variable before playing sounds in your cron script:

``` 
export XDG_RUNTIME_DIR="/run/user/1000"
```

So rather than calling your music player directly, call a script name in `crontab` like this:

``` 
0 1,13 * * * /home/ME/bin/big-ben.sh /home/ME/bin/bigben/Clock_Chime_01.ogg >/dev/null 2>&1 # JOB_ID_75
    (... SNIP ...)
45 0-23 * * * /home/ME/bin/big-ben.sh /home/ME/bin/bigben/Clock_Chime_15-3.ogg >/dev/null 2>&1
```

- Replace `ME` with your user name.
- You had an error (the spaces after `/bigben` and before `/Clock` on in the last line of your `crontab`. I've fixed the error above.
- You were using `~/` shortcut for `/home/ME` which `cron` doesn't like. Use full path names in `cron`.

----------

Then create your `/usr/local/bin/big-ben.sh` script:

``` 
#!/bin/bash
export XDG_RUNTIME_DIR="/run/user/1000"
mplayer -really-quiet "$1" -volume 100
```

- "$1" is the parameter 1 passed by `crontab` entry to your script

Remember to mark the script executable by using:

``` 
chmod a+x /usr/local/bin/big-ben.sh
```
