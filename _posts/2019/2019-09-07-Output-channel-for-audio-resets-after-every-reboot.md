---
layout:       post
title:        >
    Output channel for audio resets after every reboot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1171617
type:         Answer
tags:         sound
created_date: 2019-09-07 22:41:56
edit_date:    2019-09-08 16:49:40
votes:        "3 "
favorites:    
views:        "3,228 "
accepted:     
uploaded:     2022-04-11 05:56:55
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-09-07-Output-channel-for-audio-resets-after-every-reboot.md
toc:          false
navigation:   false
clipboard:    false
---

You can have pulse audio stay on the last selected output source no matter what:

``` 
sudo -H gedit /etc/pulse/default.pa
```

Find this line:

``` 
load-module module-switch-on-port-available
```

and change it to:

``` 
# load-module module-switch-on-port-available
```

An additional step is needed as listed in:

- [Sound configuration is lost on restart](Sound configuration is lost on restart)t 

We need to add the line:

``` 
set-sink-port <name|index>  analog-output-headphones
```

The `name` or `index` of the active sink, and available ports can be displayed with `pactl list sinks`. The way I spelled `analog-output-lineout` may be incorrect.

Save the file and exit.

Restart pulse audio with:

``` 
pulseaudio -k
```

In your sound settings select "Line Out" and it will always stay connected even if you physically unplug it.
