---
layout:       post
title:        >
    How to mute volume on every boot in Kubuntu 18.04?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1085617
type:         Answer
tags:         boot kubuntu mute
created_date: 2018-10-20 17:28:42
edit_date:    2018-10-21 13:53:23
votes:        "2 "
favorites:    
views:        "175 "
accepted:     
uploaded:     2022-01-29 15:42:01
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2018/2018-10-20-How-to-mute-volume-on-every-boot-in-Kubuntu-18.04_.md
toc:          false
navigation:   false
clipboard:    false
---

This answer from stack exchange should do the trick: [Set Ubuntu Sound Volume on boot][1]

From the question you want to use this command:

``` 
`/usr/bin/amixer -c 0 sset Master,0 0% > /dev/null`
```

From the answer you want to add the command in:

``` 
/etc/rc.local
```

Insert the command after the first line and before the last line:

``` 
#!/bin/sh    # <---- This is the first line

`/usr/bin/amixer -c 0 sset Master,0 0% > /dev/null`

exit 0       # <---- This is the last line
```


----------

In my Ubuntu 16.04 LTS sound is already muted on boot. This happens to others as well: [How to make my microphone unmuted on startup?](How to make my microphone unmuted on startup?)

Check the file `/etc/modprobe.d/alsa-base.conf` and look for the line:

``` 
options snd-hda-intel model=auto enable=yes
```

If it exists either delete it or put `#` in the first character position.

  [1]: https://stackoverflow.com/questions/414894/set-ubuntu-sound-volume-on-boot
