---
layout:       post
title:        >
    How can I route a system-wide ALSA EQ (alsaequal) through my volume control and connect PulseAudio to it?
site:         Ask Ubuntu
stack_url:    https://askubuntu.com/q/1197758
type:         Answer
tags:         sound pulseaudio alsa soundcard equalizer
created_date: 2019-12-21 21:10:03
edit_date:    
votes:        "1 "
favorites:    
views:        "2,253 "
accepted:     
uploaded:     2023-12-31 10:24:11
git_md_url:   https://github.com/pippim/pippim.github.io/blob/main/_posts/2019/2019-12-21-How-can-I-route-a-system-wide-ALSA-EQ-_alsaequal_-through-my-volume-control-and-connect-PulseAudio-to-it_.md
toc:          false
navigation:   false
clipboard:    false
---

As someone used to "plug and play" audio devices (eg never have to configure anything for sound) your problem "sounds" very complicated to me. However, there are [generic problems][1] with equalizers and the accepted answer there might help:

To start the pulseaudio equalizer run:

``` 
qpaeq
```

If this gives you the error

``` 
There was an error connecting to pulseaudio,
please make sure you have the pulseaudio dbus module loaded, exiting...
```

then load these two modules using `pactl`:

``` 
pactl load-module module-equalizer-sink
pactl load-module module-dbus-protocol
```

and, to make these changes permanent, edit `~/.config/pulse/default.pa` (create it if necessary) and add these lines:

``` 
load-module module-equalizer-sink
load-module module-dbus-protocol
```

  [1]: https://askubuntu.com/questions/980876/how-do-i-start-pulseaudio-equalizer
