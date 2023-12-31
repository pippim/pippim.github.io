---
layout:       post
title:        >
    Integrated camera
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1062680
type:         Answer
tags:         webcam camera
created_date: 2018-08-05 19:53:48
edit_date:    
votes:        "0 "
favorites:    
views:        "3,954 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-08-05-Integrated-camera.md
toc:          false
navigation:   false
clipboard:    false
---

User on [similar platform][1] with the same error messages reported that problem went away after an upgrade. So you can try:

``` 
sudo apt update
sudo apt upgrade
```


----------

On a [different platform][2] user said `sudo cheese` had to be used to make it work. In the end OP converted to `uvc` which was a better webcam app.


  [1]: https://elementaryos.stackexchange.com/questions/10464/camera-and-cheese-not-working
  [2]: https://forum.manjaro.org/t/webcam-not-working-with-cheese-unless-sudo-ed/44724/4
