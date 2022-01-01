---
layout:       post
title:        >
    Output channel for audio resets after every reboot
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1171617
type:         Answer
tags:         sound
created_date: !!str "2019-09-07 22:41:56"
edit_date:    !!str "2019-09-08 16:49:40"
votes:        !!str "2"
favorites:    
views:        !!str "2,810"
accepted:     
uploaded:     !!str "2021-12-31 17:41:14"
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

- https://askubuntu.com/questions/859732/sound-configuration-is-lost-on-restart 

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
